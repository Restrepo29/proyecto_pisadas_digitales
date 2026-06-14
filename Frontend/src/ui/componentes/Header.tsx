import { InputSearch } from "../../componentes/InputSearch";
import { TableNave } from "../../componentes/TableNave";


export const Header = () => {
 
  return (
     <header>
        <div className="header-content">
          <h1 className="name-site">
            Tienda <span>Shoes</span>
          </h1>
          <InputSearch/>
          
              <TableNave/>
        </div>
      
      </header>
    
  )
}
