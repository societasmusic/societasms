import { flatten, generate, validate } from "@/lib/isrcParser"
import dbConnect from "@/lib/mongodb"
import Artist from "@/models/Artist"
import SoundRecording from "@/models/SoundRecording"
import { auth } from "@clerk/nextjs/server"
import { Hono } from "hono"

const app = new Hono()
    .get("/", async function(context) {
        try {
            // Authenticate before serving
            const { userId } = await auth()
            if (!userId) throw new Error("Unauthorized")
            // Interact with DB
            await dbConnect()
            const soundRecordings = await SoundRecording.find().populate({path: "collaborators.artistId"})
            // Return good response
            return context.json(soundRecordings, 200)
        } catch (err) {
            // Error handler
            console.log(err)
            return context.json({message: "There was an error processing your request."}, 500)
        }
    })
    .get("/:id", async function(context) {
        try {
            // Authenticate before serving
            const { userId } = await auth()
            if (!userId) throw new Error("Unauthorized")
            // Interact with DB
            await dbConnect()
            const soundRecording = await SoundRecording.findOne({_id: context.req.param("id")}).populate({path: "collaborators.artistId"})
            if (!soundRecording) return context.json({message: "There was an error processing your request."}, 500)
            // Return good response
            return context.json(soundRecording, 200)
        } catch (err) {
            // Error handler
            console.log(err)
            return context.json({message: "There was an error processing your request."}, 500)
        }
    })
    .post("/create", async function(context) {
        try {
            // Authenticate before serving
            const { userId } = await auth()
            if (!userId) throw new Error("Unauthorized")
            // Interact with DB
            const body = await context.req.json()
            await dbConnect()
            const existingIsrcs = (await SoundRecording.find()).map(e => e.isrc)
            const year = Number(String((new Date()).getFullYear()).slice(2,4))
            const isrc = !body.values.isrc ? flatten(generate("QZ", "ZDS", year, existingIsrcs)) : body.values.isrc
            if (!validate(isrc)) throw new Error ("Invalid ISRC")
            const newSoundRecording = new SoundRecording({
                name: body.values.name, version: body.values.version, country: body.values.country, year: body.values.year, isrc: isrc,
                genre: { primary: body.values.genrePrimary, secondary: body.values.genreSecondary || "" },
                lyrics: { language: body.values.language, explicit: body.values.explicit, text: body.values.lyrics },
                createdBy: userId, updatedBy: userId
            })
            await newSoundRecording.save()
            // Return good response
            return context.json({message: "Your request was successfully processed."}, 200)
        } catch (err) {
            // Error handler
            console.log(err)
            return context.json({message: "There was an error processing your request."}, 500)
        }
    })
    .delete("/:id/delete", async function(context) {
        try {
            // Authenticate before serving
            const { userId } = await auth()
            if (!userId) throw new Error("Unauthorized")
            // Interact with DB
            await dbConnect()
            await SoundRecording.deleteOne({_id: context.req.param("id")})
            // Return good response
            return context.json({message: "Your request was successfully processed."}, 200)
        } catch (err) {
            // Error handler
            console.log(err)
            return context.json({message: "There was an error processing your request."}, 500)
        }
    })
    .put("/:id/update", async function(context) {
        try {
            // Authenticate before serving
            const { userId } = await auth()
            if (!userId) throw new Error("Unauthorized")
            // Interact with DB
            const body = await context.req.json()
            await dbConnect()
            await SoundRecording.updateOne({ _id: context.req.param("id") }, {
                $set: {
                    "name": body.values.name, "version": body.values.version, "country": body.values.country, "year": body.values.year,
                    "genre.primary": body.values.genrePrimary, "genre.secondary": body.values.genreSecondary,
                    "lyrics.language": body.values.language, "lyrics.explicit": body.values.explicit, "lyrics.text": body.values.lyrics,
                    "updatedBy": userId
                }
            })
            // Return good response
            return context.json({message: "Your request was successfully processed."}, 200)
        } catch (err) {
            // Error handler
            console.log(err)
            return context.json({message: "There was an error processing your request."}, 500)
        }
    })
    .post("/:id/collaborators/add", async function(context) {
        try {
            // Authenticate before serving
            const { userId } = await auth()
            if (!userId) throw new Error("Unauthorized")
            // Interact with DB
            const body = await context.req.json()
            if (!body.values.artistId || !body.values.role) throw new Error ("Missing form fields")
            const validArtist = await Artist.findOne({_id: body.values.artistId})
            if (!validArtist) throw new Error ("Invalid artist")
            const newCollaborator = { artistId: body.values.artistId, role: body.values.role }
            await dbConnect()
            await SoundRecording.updateOne(
                { _id: context.req.param("id") }, 
                { $push: { collaborators: newCollaborator }},
                { new: true, runValidators: true },
            )
            // Return good response
            return context.json({message: "Your request was successfully processed."}, 200)
        } catch (err) {
            // Error handler
            console.log(err)
            return context.json({message: "There was an error processing your request."}, 500)
        }
    })
    .delete("/:id/collaborators/:collaboratorId/delete", async function(context) {
        try {
            // Authenticate before serving
            const { userId } = await auth()
            if (!userId) throw new Error("Unauthorized")
            // Interact with DB
            await dbConnect()
            await SoundRecording.updateOne(
                { _id: context.req.param("id") },
                { $pull: { collaborators: { _id: context.req.param("collaboratorId") } } }
            );
            // Return good response
            return context.json({message: "Your request was successfully processed."}, 200)
        } catch (err) {
            // Error handler
            console.log(err)
            return context.json({message: "There was an error processing your request."}, 500)
        }
    })
    .put("/:id/collaborators/:collaboratorId/update", async function(context) {
        try {
            // Authenticate before serving
            const { userId } = await auth()
            if (!userId) throw new Error("Unauthorized")
            // Interact with DB
            const body = await context.req.json()
            await dbConnect()
            if (!body.values.artistId || !body.values.role) throw new Error ("Missing form fields")
            const validArtist = await Artist.findOne({_id: body.values.artistId})
            if (!validArtist) throw new Error ("Invalid artist")
            const result = await SoundRecording.updateOne(
                { _id: context.req.param("id"), "collaborators._id": context.req.param("collaboratorId")}, 
                { $set: { 
                    "collaborators.$.artistId": body.values.artistId,
                    "collaborators.$.role": body.values.role
                }}, { runValidators: true },
            )
            if (result.modifiedCount === 0) {
                throw new Error("No matching collaborator found or no changes made.");
            }
            // Return good response
            return context.json({message: "Your request was successfully processed."}, 200)
        } catch (err) {
            // Error handler
            console.log(err)
            return context.json({message: "There was an error processing your request."}, 500)
        }
    })

export default app