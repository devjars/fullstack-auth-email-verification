import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type response = {
  status : boolean,
  message : string
}
function SignUpForm() {
const [isLoading,setisLoading] = useState<boolean>(false)
const [responsemsg,setresponsemsg] = useState<response | null>(null)
const navigate = useNavigate()
  
      const FormSchema = z.object({
          email: z.string().email(),
          password: z.string().min(8),
          confirmPassword: z.string(),
})
        .refine((data) => data.password === data.confirmPassword, {
          path: ["confirmPassword"],
          message: "Passwords do not match",
        });
    
      const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          email: "",
          password: "",
          confirmPassword: "",
        },
      });
        axios.defaults.withCredentials = true

        const onSubmit = async (data: z.infer<typeof FormSchema>) => {
          if(!data){
            return 
          }
          setisLoading(true)
          try{
            
            const res = await axios.post("http://localhost:3000/auth/register",data)
            if(res.data.success){
                console.log("Check Your Email For Verifcation")
                
              setresponsemsg({status : true , message :res.data.message})
                navigate("/verify")
            }else{
              console.log(res.data.message)
              setresponsemsg({status : false , message :res.data.message})

            }
          }catch(error:any){
           if(error){
            console.log(error.response.data.message)
              setresponsemsg({status : false , message :error.response.data.message})

            
           }
          setisLoading(false)
          

          }



          // form.reset({
          //   email : "",
          //   password : "",
          //   confirmPassword : ""
          // })

  };

  return (
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
             <h2 className="text-lg font-bold text-center mb-4">
   Create your account.
</h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           <Button  type="submit" className="w-full cursor-pointer" disabled={isLoading}>
             {isLoading ? "Registering..." : "Register"}
            </Button>

          {responsemsg && 
            <p className={` text-center ${responsemsg.status ? "text-green-500" : "text-red-500"}`}>
              {responsemsg.message}</p>}
            </form>
        
        </Form>
  )
}

export default SignUpForm
