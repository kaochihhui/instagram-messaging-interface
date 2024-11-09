'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface JsonInput {
  username: string;
  password: string;
  recipient: string;
  message: string;
}

export default function JsonInputForm({ onJsonSubmit }: { onJsonSubmit: (data: JsonInput) => void }) {
  const [jsonInput, setJsonInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const parsedJson: JsonInput = JSON.parse(jsonInput)
      onJsonSubmit(parsedJson)
    } catch (error) {
      console.error('Invalid JSON input:', error)
      // Here you would typically show an error message to the user
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>JSON Input</CardTitle>
        <CardDescription>Paste your JSON input here</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <Textarea 
              placeholder="Paste your JSON here"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Submit JSON</Button>
      </CardFooter>
    </Card>
  )
}