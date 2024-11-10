'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type JsonInputData = {
  jsonContent: string;
}

export default function JsonInput({ onSubmit: onSubmitProp }: { onSubmit: (json: object) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<JsonInputData>()
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: JsonInputData) => {
    try {
      const parsedJson = JSON.parse(data.jsonContent)
      await onSubmitProp(parsedJson)
      reset() // Clear form after successful submission
      setError(null)
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON format. Please check your input.')
      } else {
        setError('Failed to process JSON. Please try again.')
      }
    }
  }

  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader>
        <CardTitle>JSON Input</CardTitle>
        <CardDescription>Enter your JSON configuration</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="jsonContent">JSON Content</Label>
              <Textarea 
                id="jsonContent"
                rows={10}
                {...register("jsonContent", { 
                  required: "JSON content is required",
                  validate: {
                    isValidJson: (value) => {
                      try {
                        JSON.parse(value)
                        return true
                      } catch (e) {
                        return "Invalid JSON format"
                      }
                    }
                  }
                })}
              />
              {errors.jsonContent && <span className="text-sm text-red-500">{errors.jsonContent.message}</span>}
            </div>
          </div>
          {error && (
            <Alert className="mt-4" variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full mt-4">Submit JSON</Button>
        </form>
      </CardContent>
    </Card>
  )
}