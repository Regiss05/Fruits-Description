import ItemContext from '@/context/itemContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <ItemContext>
  <Component {...pageProps} />
  </ItemContext> 
}
