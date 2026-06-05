type ErrorMessageProps = {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) {
    return null
  }

  return (
    <p className="error-message" role="alert" aria-live="assertive">
      {message}
    </p>
  )
}
