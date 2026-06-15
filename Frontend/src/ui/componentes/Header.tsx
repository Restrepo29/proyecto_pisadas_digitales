import { InputSearch } from "../../componentes/InputSearch";
import { TableNave } from "../../componentes/TableNave";
import calzadoGloria from "../../images/calzadoGloria.png";


export const Header = () => {
 
  return (
     <header>
        <div className="header-content">
          <a className="brand-mark" href="/" aria-label="Calzado Gloria">
            <img src={calzadoGloria} alt="Calzado Gloria" />
          </a>
          <InputSearch/>
          
              <TableNave/>
        </div>
      
      </header>
    
  )
}
