import './globals.css'

export const metadata = {
  title: 'Baby Shower Invitation - Megan Woods',
  description: 'You\'re invited to celebrate the upcoming arrival!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
