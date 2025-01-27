"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, CloudUpload, Paperclip } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "./ui/textarea"
import { redirect } from "next/navigation"
import { validate } from "@/lib/isrcParser"

export default function AppForm({ model, api, method = "POST", redirectPath, formPath  }) {
    const formSchema = z.object(
        model.reduce((acc, field) => {
            if (field.variant === "Checkbox") acc[field.name] = field.required ? z.boolean().refine((val) => val === true, { 
                message: "This field must be checked" }) : z.boolean().optional();
            else if (field.type === "isrc") acc[field.name] = z.string().refine((val) => !val || validate(val), { 
                message: "Invalid ISRC" });
            else acc[field.name] = field.required ? z.string().nonempty({ 
                message: "This field is required" }) : z.string().optional();
            return acc;
        }, {})
    )
    const defaultValues = model.reduce((acc, field) => {
        acc[field.name] = field.value || ""
        return acc
    }, {})
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues
    })
    const { getToken } =  useAuth()
    async function onSubmit(values) {
        try {
            const token = await getToken()
            const options = {
                method: method,
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({values}),
                cache: "no-store",
            }
            const response = await fetch(api, options)
            if (!response.ok) throw new Error ("API returned bad response.")
            toast("Your request was successfully processed.")
        } catch (err) {
            console.error("Form submission error", err)
            toast.error("There was an error processing your request.")
            redirectPath = formPath
        }
        redirect(redirectPath)
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl p-6">
                    <div className="grid grid-cols-12 gap-y-8 gap-x-4">    
                        {model.map((field, fieldIndex) => {
                            const { label, name, type, placeholder, variant, description, disabled, colSpan, options } = field
                            if (variant === "Input") {
                                return (
                                    <div className={`col-span-${colSpan || 12}`} key={fieldIndex}>
                                        <FormField control={form.control} name={name} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{label}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={placeholder} type={type || "text"} disabled={disabled} {...field}/>
                                                </FormControl>
                                                <FormDescription>{description}</FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}/>
                                    </div>
                                )
                            } else if (variant === "Combobox") {
                                return (
                                    <div className={`col-span-${colSpan || 12}`} key={fieldIndex}>
                                        <FormField control={form.control} name={name} render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="mt-1 mb-[6px]">{label}</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")} disabled={disabled}>
                                                                {field.value ? options.find((option) => option.code === field.value)?.name : "Select options"}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[352px] p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search options..." />
                                                            <CommandList>
                                                                <CommandEmpty>No results found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {options.map((option) => (
                                                                        <CommandItem value={option.name} key={option.code} onSelect={() => { form.setValue(name, option.code) }}>
                                                                            <Check className={cn("mr-2 h-4 w-4", option.code === field.value ? "opacity-100" : "opacity-0")}/>
                                                                            {option.name}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FormDescription>{description}</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}/>
                                    </div>
                                )
                            } else if (variant === "Checkbox") {
                                return (
                                    <div className={`col-span-${colSpan || 12}`} key={fieldIndex}>
                                        <FormField control={form.control} name={name} render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={disabled}/>
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>{label}</FormLabel>
                                                    <FormDescription>{description}</FormDescription>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}/>
                                    </div>
                                )
                            } else if (variant === "Textarea") {
                                return (
                                    <div className={`col-span-${colSpan || 12}`} key={fieldIndex}>
                                        <FormField control={form.control} name={name} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{label}</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder={placeholder} disabled={disabled} {...field}/>
                                                </FormControl>
                                                <FormDescription>{description}</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}/>
                                    </div>
                                )
                            } else return
                        })}
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}