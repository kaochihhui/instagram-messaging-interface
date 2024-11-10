'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type MessageFormData = {
  recipient: string;
  message: string;
}

export default function MessageForm({ onSend }: { onSend: (recipient: string, message: string) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<MessageFormData>()
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: MessageFormData) => {
    try {
      await onSend(data.recipient, data.message)
      reset() // Clear form after successful send
      setError(null)
    } catch (err) {
      setError('Failed to send message. Please try again.')
    }
  }

  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader>
        <CardTitle>Send Message</CardTitle>
        <CardDescription>Send a direct message to an Instagram user</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="recipient">Recipient</Label>
              <Input 
                id="recipient"
                {...register("recipient", { 
                  required: "Recipient username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._]+$/,
                    message: "Invalid Instagram username format"
                  }
                })}
              />
              {errors.recipient && <span className="text-sm text-red-500">{errors.recipient.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message"
                {...register("message", { 
                  required: "Message is required",
                  maxLength: {
                    value: 1000,
                    message: "Message cannot exceed 1000 characters"
                  }
                })}
              />
              {errors.message && <span className="text-sm text-red-500">{errors.message.message}</span>}
            </div>
          </div>
          {error && (
            <Alert className="mt-4" variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full mt-4">Send Message</Button>
        </form>
      </CardContent>
    </Card>
  )
}