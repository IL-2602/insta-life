import { ReactNode } from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
      {children}
    </GoogleOAuthProvider>
  )
}
