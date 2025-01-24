import { Hono } from "hono"
import { handle } from "hono/vercel"

// Import routes
import recordlabels from "./recordlabels"

// Runtime environment
export const runtime = "nodejs"

// Set up base path route
const app = new Hono().basePath("/api")

// Routes
app.route("/labels", recordlabels)

export const GET = handle(app)
export const POST = handle(app)
export const DELETE = handle(app)
export const PUT = handle(app)