import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './normalize.css'
import './index.css'
import { MueblesApp } from './MueblesApp'
import { UserContextProvider } from './context/UseCartContext'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
<UserContextProvider>
 <MueblesApp />
</UserContextProvider>
  </StrictMode>,
)
