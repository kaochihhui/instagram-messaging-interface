'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

const messageSchema = z.object({
  recipient: z.string().min(1, 'Recipient is required'),
  message: z.string().min(1, 'Message is required').max(1000, 'Message must be 1000 characters or less'),
})

type MessageFormData = z.infer<typeof messageSchema>

export default function MessageForm({ onSendMessage }: { onSendMessage: (recipient: string, message: string) => Promise<void> }) {
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema)
  })

  const onSubmit = async (data: MessageFormData) => {
    try {
      await onSendMessage(data.recipient, data.message)
      setError(null)
    } catch (err) {
      setError('Failed to send message. Please try again.')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              {...register('recipient')}
              placeholder="Enter recipient's username"
            />
            {errors.recipient && (
              <p className="text-sm text-red-500">{errors.recipient.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Type your message here"
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Send Message</Button>
        </CardFooter>
      </form>
    </Card>
  )
}