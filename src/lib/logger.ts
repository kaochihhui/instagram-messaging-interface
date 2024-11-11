type LogLevel = 'info' | 'warn' | 'error'

export function log(level: LogLevel, message: string, meta?: Record<string, any>) {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`
  
  // In production, you might want to use a proper logging service
  if (process.env.NODE_ENV === 'production') {
    // Example: send logs to a logging service
    // await logService.log(level, message, meta)
    console[level](logMessage, meta)
  } else {
    console[level](logMessage, meta)
  }
}