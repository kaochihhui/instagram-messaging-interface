'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type LoginFormData = {
  username: string;
  password: string;
}

export default function LoginForm({ onLogin }: { onLogin: (username: string, password: string) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: LoginFormData) => {
    try {
      await onLogin(data.username, data.password)
    } catch (err) {
      setError('An error occurred during login. Please try again.')
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your Instagram credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && <span className="text-sm text-red-500">{errors.username.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
            </div>
          </div>
          {error && (
            <Alert className="mt-4" variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full mt-4">Login</Button>
        </form>
      </CardContent>
    </Card>
  )
}