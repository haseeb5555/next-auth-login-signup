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

const formSchema = z.object({

  email:z.string().nonempty(),
  password:z.string().nonempty()
})

// ...

export function Login() {
    const form =useForm<z.infer< typeof formSchema>>({
        resolver : zodResolver(formSchema) ,
        defaultValues:{
     
            email:"",
            password:""
        }
    })
 function onSubmit(values: z.infer<typeof formSchema>) {
           
      }
    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex max-lg:flex-col flex-col">

         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} 
                
                />
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
        
        <Button type="submit" variant='netflix'>Login</Button>
      
        <Link href='/sign-up' className="ml-3">
          don`t have any account? <span className="font-bold underline">SignUp</span>
        </Link>

   
      </form>
    </Form>
  )
}
