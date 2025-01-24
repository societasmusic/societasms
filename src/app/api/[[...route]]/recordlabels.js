import dbConnect from "@/lib/mongodb"
import RecordLabel from "@/models/RecordLabel"
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
            const recordlabels = await RecordLabel.find()
            // Return good response
            return context.json(recordlabels, 200)
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
            const recordlabel = await RecordLabel.findOne({_id: context.req.param("id")})
            if (!recordlabel) return context.json({message: "There was an error processing your request."}, 500)
            // Return good response
            return context.json(recordlabel, 200)
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
            const newRecordLabel = new RecordLabel({
                name: body.values.name, dpid: body.values.dpid, isni: body.values.isni, createdBy: userId, updatedBy: userId
            })
            await newRecordLabel.save()
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
            await RecordLabel.deleteOne({_id: context.req.param("id")})
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
            await RecordLabel.updateOne({_id: context.req.param("id")}, {
                name: body.values.name, dpid: body.values.dpid, isni: body.values.isni, updatedBy: userId
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