import {  NavLink } from "react-router";


export const Navbar = () => {
  
    //  const { categoria } = useParams();
    //  console.log(categoria);
    
  return (
    <>
     
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2  ">
        <div className="navbar-collapse">
          <div className="navbar-nav  ">
            <NavLink
              className={({ isActive }) => `nav-link nav-link 
                        ${isActive ? "active" : ""}`}
              to="/"
            >
              Inicio
            </NavLink>
            {/** clase de ruta activa */}

            <NavLink
              className={({ isActive }) => `nav-link nav-link 
                        ${isActive ? "active" : ""}`}
              to="/about"
            >
              Nosotros
            </NavLink>
           

             <NavLink
              className={({ isActive }) => `nav-link nav-link 
                        ${isActive ? "active" : ""}`}
              to="/store/calzado"
              
            >
              Calzado
              
            </NavLink> 
             <NavLink
              className={({ isActive }) => `nav-link nav-link 
                        ${isActive ? "active" : ""}`}
              to="/store/bolsos"
              
            >
              Bolsos
              
            </NavLink> 
             <NavLink
              className={({ isActive }) => `nav-link nav-link 
                        ${isActive ? "active" : ""}`}
              to="/store/accesorios"
              
            >
              Accesorios
              
            </NavLink> 

            
          
            <NavLink
              className={({ isActive }) => ` nav-link nav-link 
                        ${isActive ? "active" : ""}`}
              to="/blog"
            >
              Blog
            </NavLink>
          
          

       </div>
     </div>
      </nav>
    </>
  );
};
