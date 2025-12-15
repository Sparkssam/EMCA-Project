export function handleActionError(error: unknown) {
  console.error('Action error:', error)
  
  let message = "An unexpected error occurred. Please try again."

  // Check if it's a rate limit error or a known error type
  if (error instanceof Error) {
    // If it's a rate limit error, we want to show that specific message
    if (error.message.includes('Rate limit')) {
      message = error.message
    }
    // We can add more specific error checks here if needed
  }

  // Return both error and message keys for compatibility across different actions
  return {
    success: false,
    error: message,
    message: message
  }
}
