export function useErrorHandler() {
  const toast = useToast()

  function handleError(error: unknown) {
    // Log error
    console.error('Error:', error)

    // Show user-friendly message
    const message = error instanceof Error
      ? error.message
      : 'An unexpected error occurred'

    toast.error({
      title: 'Error',
      message,
      duration: 5000,
    })

    // Track error in monitoring
    trackError(error)
  }

  return {
    handleError,
  }
}
