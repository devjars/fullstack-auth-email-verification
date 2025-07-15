"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/Context/AuthContext"

const FormSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

type responsemsg = {
  issuccess: true | false
  message: string
}

function Verification() {
  const navigate = useNavigate()
  const [responsemsg, setresponsemsg] = useState<responsemsg | null>(null)
  const { setisVerified } = useAuth()

  axios.defaults.withCredentials = true


    useEffect(()=>{
        const CheckPending = async ()=>{
          try{
            const res = await axios.get("http://localhost:3000/auth/verification-status")

          if(res.data.success){
           return
          }else{
            console.log("hehe")
             navigate("/")
          }
      
          }catch(err){
            navigate("/")
          }}
            CheckPending()
    },[])


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!data) return

    try {
      const res = await axios.post("http://localhost:3000/auth/verify", data)
      if (res.data.success) {
        setisVerified(true)
        setresponsemsg({ issuccess: true, message: res.data.message })
        navigate("/dashboard")
      } else {
              setresponsemsg({ issuccess: false, message: res.data.message })

      }
    } catch (err: any) {
      if (err) {
        setresponsemsg({ issuccess: false, message: err.response?.data?.message || "An error occurred" })
        form.reset({ code: "" })
      }
    }
  }

  return (
    <Form {...form}>
      <div className="w-screen h-screen flex justify-center items-center bg-neutral-200">
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6 bg-white rounded-2xl">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    onChange={(value) => {
                      field.onChange(value)
                      if (value.length > 0) {
                        setresponsemsg(null)
                      }
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your Email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>

          {responsemsg && (
            <p className={`${responsemsg.issuccess ? "text-green-500" : "text-red-500"}`}>
              {responsemsg.message}
            </p>
          )}
        </form>
      </div>
    </Form>
  )
}

export default Verification
