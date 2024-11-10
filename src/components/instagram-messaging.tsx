'use client'

import { useState } from 'react'
import { loginToInstagram, sendInstagramMessage } from '@/lib/agentql'
import LoginForm from './login-form'
import MessageForm from './message-form'
import JsonInputForm from './json-input'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function InstagramMessaging() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [useJsonInput, setUseJsonInput] = useState(false)
  const [response, setResponse] = useState<{ success: boolean; message: string } | null>(null)

  const handleLogin = async (username: string, password: string) => {
    try {
      const result = await loginToInstagram(username, password)
      if (result.success) {
        setIsLoggedIn(true)
        setResponse({ success: true, message: 'Logged in successfully' })
      } else {
        setResponse({ success: false, message: result.error || 'Login failed' })
      }
    } catch (error) {
      setResponse({ success: false, message: 'An error occurred during login' })
    }
  }

  const handleSendMessage = async (recipient: string, message: string) => {
    try {
      const result = await sendInstagramMessage(recipient, message)
      setResponse({ success: true, message: 'Message sent successfully' })
    } catch (error) {
      setResponse({ success: false, message: 'An error occurred while sending the message' })
    }
  }

  const handleJsonSubmit = async (data: { username: string; password: string; recipient: string; message: string }) => {
    try {
      const loginResult = await loginToInstagram(data.username, data.password)
      if (loginResult.success) {
        setIsLoggedIn(true)
        const messageResult = await sendInstagramMessage(data.recipient, data.message)
        setResponse({ success: true, message: 'Logged in and sent message successfully' })
      } else {
        setResponse({ success: false, message: loginResult.error || 'Login failed' })
      }
    } catch (error) {
      setResponse({ success: false, message: 'An error occurred while processing JSON input' })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Instagram Messaging Interface</CardTitle>
          <CardDescription>Send messages via Instagram</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Switch id="use-json" checked={useJsonInput} onCheckedChange={setUseJsonInput} />
            <Label htmlFor="use-json">Use JSON Input</Label>
          </div>
          {!isLoggedIn && !useJsonInput && <LoginForm onLogin={handleLogin} />}
          {isLoggedIn && !useJsonInput && <MessageForm onSendMessage={handleSendMessage} />}
          {useJsonInput && <JsonInputForm onJsonSubmit={handleJsonSubmit} />}
          {response && (
            <div className={`mt-4 p-4 rounded ${response.success ? 'bg-green-100' : 'bg-red-100'}`}>
              {response.message}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsLoggedIn(false)} className="w-full">Logout</Button>
        </CardFooter>
      </Card>
    </div>
  )
}