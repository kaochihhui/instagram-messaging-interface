'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import LoginForm from './login-form'
import MessageForm from './message-form'
import JsonInputForm from './json-input'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ErrorBoundary from './error-boundary'

export default function InstagramMessaging() {
  const { data: session, status } = useSession()
  const [useJsonInput, setUseJsonInput] = useState(false)
  const [response, setResponse] = useState<{ success: boolean; message: string } | null>(null)
  const [csrfToken, setCsrfToken] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
  }, [])

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
    if (!csrfToken) {
      setResponse({ success: false, message: 'CSRF token not available' })
      return
    }

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient, message, csrfToken }),
      })

      const data = await response.json()

      if (response.ok) {
        setResponse({ success: true, message: 'Message sent successfully' })
      } else {
        setResponse({ success: false, message: data.error || 'Failed to send message' })
      }
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
        await handleSendMessage(data.recipient, data.message)
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
    <ErrorBoundary>
      <div className="flex flex-col items-center justify-center min-h-screen">
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
            {status === 'loading' ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : (
              <>
                {status === 'unauthenticated' && !useJsonInput && <LoginForm onLogin={handleLogin} />}
                {status === 'authenticated' && !useJsonInput && <MessageForm onSendMessage={handleSendMessage} />}
                {useJsonInput && <JsonInputForm onJsonSubmit={handleJsonSubmit} />}
              </>
            )}
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
    </ErrorBoundary>
  )
}