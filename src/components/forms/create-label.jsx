"use client"

import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation"

// Zod schema
const formSchema = z.object({
    name: z.string().nonempty(),
    dpid: z.string().optional(),
    isni: z.string().optional()
});

// Form export
export default function CreateLabel() {
    // Form hook initialization and default values
    const form = useForm ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "", dpid: "", isni: ""
        }
    })
    // Clerk auth token
    const { getToken } =  useAuth()
    // Submission handler
    async function onSubmit(values) {
        try {
            // Submit logic
            const token = await getToken()
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({values}),
                cache: "no-store",
            }
            const response = await fetch(`/api/labels/create`, options)
            if (!response.ok) throw new Error ("API returned bad response.")
            toast("Your request was successfully processed.")
        } catch (err) {
            // Error handler
            console.error("Form submission error", err)
            toast.error("There was an error processing your request.")
        }
        redirect("/catalog/labels")
    }
    // Form user interface
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl p-6">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Record Label Name</FormLabel>
                                <FormControl>
                                    <Input 
                                    placeholder="XYZ Records"
                                    type="text"
                                    {...field} />
                                </FormControl>
                                <FormDescription>This is the name that will appear in stores</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="dpid"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>DDEX DPID</FormLabel>
                                <FormControl>
                                    <Input 
                                    placeholder=""
                                    type="text"
                                    {...field} />
                                </FormControl>
                                <FormDescription>Optional DDEX party identifier</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="isni"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>ISNI</FormLabel>
                                <FormControl>
                                    <Input 
                                    placeholder=""
                                    type="text"
                                    {...field} />
                                </FormControl>
                                <FormDescription>Optional ISNI identifier</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}