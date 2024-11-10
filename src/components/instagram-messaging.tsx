'use client'

import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { sendInstagramMessage } from '@/lib/agentql'
import LoginForm from './login-form'
import MessageForm from './message-form'
import JsonInputForm from './json-input'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function InstagramMessaging() {
  const { data: session, status } = useSession()
  const [useJsonInput, setUseJsonInput] = useState(false)
  const [response, setResponse] = useState<{ success: boolean; message: string } | null>(null)

  const handleLogin = async (username: string, password: string) => {
    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })
      if (result?.error) {
        setResponse({ success: false, message: result.error || 'Login failed' })
      } else {
        setResponse({ success: true, message: 'Logged in successfully' })
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
      const loginResult = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      })
      if (loginResult?.error) {
        setResponse({ success: false, message: loginResult.error || 'Login failed' })
      } else {
        const messageResult = await sendInstagramMessage(data.recipient, data.message)
        setResponse({ success: true, message: 'Logged in and sent message successfully' })
      }
    } catch (error) {
      setResponse({ success: false, message: 'An error occurred while processing JSON input' })
    }
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    setResponse(null)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Instagram Messaging Interface</CardTitle>
          <CardDescription>Send messages via Instagram</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Switch 
              id="use-json" 
              checked={useJsonInput} 
              onCheckedChange={setUseJsonInput} 
              disabled={status === 'loading'}
            />
            <Label htmlFor="use-json">Use JSON Input</Label>
          </div>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'unauthenticated' && !useJsonInput && <LoginForm onLogin={handleLogin} />}
          {status === 'authenticated' && !useJsonInput && <MessageForm onSendMessage={handleSendMessage} />}
          {useJsonInput && <JsonInputForm onJsonSubmit={handleJsonSubmit} />}
          {response && (
            <Alert className={`mt-4 ${response.success ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
              <AlertDescription>{response.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          {status === 'authenticated' && (
            <Button onClick={handleLogout} className="w-full">Logout</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}