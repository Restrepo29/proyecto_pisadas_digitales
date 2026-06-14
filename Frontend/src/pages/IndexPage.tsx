
import { ImgCategorias } from "../componentes/ImgCategorias"





export const IndexPage = () => {



  return (
 <>
   <div className="hero"></div>
   
      <section className="container categories">
        <ImgCategorias />
      </section>

         <section className="about-us">
        <div className="container about-us-grid">
          <div className="text-about">
            <h2>Sobre Nosotros</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              repellat aut id quae sequi nulla, magni inventore omnis voluptas
              error perspiciatis nesciunt vero hic ab veniam iste laboriosam,
              commodi nisi! Soluta, eius neque. Iure voluptates maxime ut.
              Assumenda, eius mayores?
            </p>
          </div>
        </div>
      </section>

      
      {/* <main className="content-principal container">
         <h2 className="text-center">Nuestros Productos</h2> 
        <div className="products-list">
        
          {data?.productos.map((item) => (
            <ProductosP key={item.id_prod}
                   item={item}
                      />
          ))} 

       

          </div>
        
      </main> */}
    
   
   </>
  )
}
