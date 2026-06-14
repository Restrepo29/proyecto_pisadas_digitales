

 import { Pagination } from "../componentes/Pagination"

import { FilterSidebar } from "../componentes/Filter"
import { ProductsGrid } from "../componentes/ProductsGrid"
import { useGetProduct } from "../hooks/useGetProduct";
import { CustomTitle } from "../componentes/CustomTitle";
import { useParams } from "react-router";


 
export const StorePage = () => {

 const { data } = useGetProduct();
 const {gender}=useParams()
 
   const categoriaLabel = 
  gender === 'calzado'
  ? 'Calzado'
  : gender === 'accesorios'
  ? 'Accesorios'
  : gender === 'bolsos'
  ? 'Bolsos'
  : '';
 
 
 
  return (
   <main className="container-xl mt-7 content-principal">
     <CustomTitle title={`Nuestra Colección ${categoriaLabel}`}/>
      
      <div className="store-layout">
        {/* Contenido principal - Productos */}
        <div className="products-container">
          <ProductsGrid />
          
          <Pagination totalPages={data?.pagination?.totalPages ?? 1} />
        </div>
        
        {/* Sidebar de filtros - Lado derecho */}
         <div className="filter-sidebar-container">
           <FilterSidebar /> 
        </div>
      </div>
   </main>
  )
}
