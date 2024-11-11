type LogLevel = 'info' | 'warn' | 'error'

export function log(level: LogLevel, message: string, meta?: any) {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`
  
  if (meta) {
    console[level](logMessage, meta)
  } else {
    console[level](logMessage)
  }
}