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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import Spinner from "../ui/Spinner";

type responsemsg = {
  status : boolean,
  message : string

}
function LogInForm() {
    const [response,setresponse] = useState<responsemsg | null >(null)
    const [isloading,setisloading] = useState<boolean>(false)
  const navigate = useNavigate()
  const {setisVerified} = useAuth()
      const FormSchema = z
        .object({
          email: z.string().email(),
          password: z.string()
        })
      
      const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });

      axios.defaults.withCredentials = true
        const onSubmit = async (data: z.infer<typeof FormSchema>) => {
          if(!data){
            return
          }
          setisloading(true)
          try{
            const res = await axios.post("http://localhost:3000/auth/login",data)
            if(res.data.success){
              console.log(res.data.message)
              setisVerified(true)
              setresponse({status : true , message : res.data.message})
              navigate("/dashboard")
          setisloading(false)

            }else{
              setresponse({status : false , message : res.data.message})
              console.log(res.data.message)
          setisloading(false)

            }
          }catch(err:any){
             console.log(err?.response.data.message)
              setresponse({status : false , message :err.response.data.message})
          setisloading(false)

            
          }

  };
  const watchedEmail = form.watch('email')
  const watchedPassword = form.watch('password')

  useEffect(()=>{
    if(response && (watchedEmail || watchedPassword)){
      setresponse(null)
    }
  },[watchedEmail,watchedPassword])


  return (
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
           <h2 className="text-lg font-bold text-center mb-4">
   Log in to your account.
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

            {/* Password */}
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

       

            <Button type="submit" className="w-full cursor-pointer">
              Log in
            </Button>
            {isloading && <div className="w-full flex justify-center items-center"><Spinner/></div>}
            {response && 
            <p className={` text-center ${response.status ? "text-green-500" : "text-red-500"}`}>
              {response.message}</p>}
          </form>
        </Form>
  )
}

export default LogInForm
