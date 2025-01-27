"use client"

import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Check,
  ChevronsUpDown
} from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const formSchema = z.object({
    name: z.string().nonempty(),
    spotifyLink: z.string().optional(),
    appleMusicLink: z.string().optional(),
    pro: z.string().optional(),
    ipi: z.string().optional(),
    isni: z.string().optional()
});

export default function CreateArtist() {
    const pros = [
        { label: "None", value: "" },
        { label: "AllTrack (US)", value: "AllTrack" },
        { label: "ASCAP (US)", value: "ASCAP" },
        { label: "BMI (US)", value: "BMI" },
        { label: "Global Music Rights (US)", value: "Global Music Rights" },
        { label: "SESAC (US)", value: "SESAC" },
        { label: "Pro Music Rights (US)", value: "Pro Music Rights" },
        { label: "SOCAN (CA)", value: "SOCAN" },
        { label: "Re:Sound (CA)", value: "Re:Sound" },
        { label: "CMRRA (CA)", value: "CMRRA" },
    ]
    const form = useForm ({
            resolver: zodResolver(formSchema),
            defaultValues: { name: "", spotifyLink: "", appleMusicLink: "", pro: "", ipi: "", isni: "" }
        })
    // Clerk auth token
    const { getToken } =  useAuth()
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
            const response = await fetch(`/api/artists/create`, options)
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
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl p-6">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Artist Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" type="text" {...field}/>
                                </FormControl>
                                <FormDescription>This is the name that will appear in stores</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <FormField
                        control={form.control}
                        name="spotifyLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Spotify Profile</FormLabel>
                                <FormControl>
                                    <Input placeholder="" type="text" {...field}/>
                                </FormControl>
                                <FormDescription>Used to match to the correct Spotify artist profile</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-6">
                    <FormField
                        control={form.control}
                        name="appleMusicLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apple Music Profile</FormLabel>
                                <FormControl>
                                    <Input placeholder=""type="text"{...field}/>
                                </FormControl>
                                <FormDescription>Used to match to the correct Apple Music artist profile</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                    <FormField
                        control={form.control}
                        name="pro"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="mt-1 mb-[6px]">PRO</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? pros.find(
                                                    (e) => e.value === field.value
                                                )?.label
                                                : "Select PRO"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[229px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search PRO..." />
                                            <CommandList>
                                                <CommandEmpty>No PRO found.</CommandEmpty>
                                                <CommandGroup>
                                                    {pros.map((e) => (
                                                        <CommandItem
                                                            value={e.label}
                                                            key={e.value}
                                                            onSelect={() => {
                                                            form.setValue("pro", e.value);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    e.value === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                                )}
                                                            />
                                                            {e.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>PRO affiliation of the artist</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-4">
                    <FormField
                        control={form.control}
                        name="ipi"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>IPI</FormLabel>
                                <FormControl>
                                    <Input placeholder="" type="number" {...field} />
                                </FormControl>
                                <FormDescription>Interested party identifier (IPI)</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-4">
            
                    <FormField
                        control={form.control}
                        name="isni"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ISNI</FormLabel>
                                <FormControl>
                                    <Input placeholder=""type="text"{...field} />
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
)}