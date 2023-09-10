"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm} from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().nonempty(),
  email:z.string().nonempty(),
  password:z.string().nonempty()
})

// ...

export function SignUp() {
  const router = useRouter();
    const form =useForm<z.infer< typeof formSchema>>({
        resolver : zodResolver(formSchema) ,
        defaultValues:{
            name:"",
            email:"",
            password:""
        }
    })
 async function onSubmit(values: z.infer<typeof formSchema>) {
       await fetch('http://localhost:3000/user',{
        method :"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:values.name,email:values.email,password:values.password}),
       }) 
       router.push('/')
      }
    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
     
              <FormControl>
                <Input  type ="text" placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">SignUp</Button>
        <Link href='/' className="ml-3">
          Have already account? <span className="font-bold underline">Login</span>
        </Link>
      </form>
    </Form>
  )
}
