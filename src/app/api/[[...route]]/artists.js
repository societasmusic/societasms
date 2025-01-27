import dbConnect from "@/lib/mongodb"
import Artist from "@/models/Artist"
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
            const artists = await Artist.find()
            // Return good response
            return context.json(artists, 200)
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
            const artist = await Artist.findOne({_id: context.req.param("id")})
            if (!artist) return context.json({message: "There was an error processing your request."}, 500)
            // Return good response
            return context.json(artist, 200)
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
            const newArtist = new Artist({
                name: body.values.name, 
                dspProfiles: {
                    spotify: body.values.spotifyLink, 
                    appleMusic: body.values.appleMusicLink, 
                },
                pro: body.values.pro, 
                ipi: body.values.ipi, 
                isni: body.values.isni, 
                createdBy: userId, 
                updatedBy: userId
            })
            await newArtist.save()
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
            await Artist.deleteOne({_id: context.req.param("id")})
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
            await Artist.updateOne({_id: context.req.param("id")}, {
                name: body.values.name, 
                dspProfiles: {
                    spotify: body.values.spotifyLink, 
                    appleMusic: body.values.appleMusicLink, 
                },
                pro: body.values.pro, 
                ipi: body.values.ipi, 
                isni: body.values.isni, 
                updatedBy: userId
            })
            // Return good response
            return context.json({message: "Your request was successfully processed."}, 200)
        } catch (err) {
            // Error handler
            console.log(err)
            return context.json({message: "There was an error processing your request."}, 500)
        }
    })

export default app