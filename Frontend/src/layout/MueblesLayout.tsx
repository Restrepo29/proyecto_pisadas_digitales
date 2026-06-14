import { Outlet } from "react-router"
import { Footer, Navbar, Header } from "../ui/componentes"



export const MueblesLayout = () => {

  return (
   <>    
   <Header/>
   <Navbar   />
   <Outlet/>
   <Footer/>
   </>
  )
}
