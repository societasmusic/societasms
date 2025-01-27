"use client"

import { toast } from "sonner";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation"


export default function DeleteArtist(props) {
    // Clerk auth token
    const { getToken } =  useAuth()
    async function handleSubmit() {
        try {
            // Submit logic
            const token = await getToken()
            const options = {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                cache: "no-store",
            }
            const response = await fetch(`/api/artists/${props.id}/delete`, options)
            if (!response.ok) throw new Error ("API returned bad response.")
            toast("Your request was successfully processed.")
        } catch (err) {
            // Error handler
            console.error("Form submission error", err)
            toast.error("There was an error processing your request.")
        }
        redirect("/catalog/artists")
    }
    return (
        <form action={handleSubmit} className="flex gap-2">
            <DialogClose asChild><Button>Cancel</Button></DialogClose>
            <Button variant="destructive" type="submit">Yes, delete.</Button>
        </form>
    )
}