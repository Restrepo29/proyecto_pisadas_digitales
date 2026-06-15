
import { ImgCategorias } from "../componentes/ImgCategorias"
import portada1 from "../images/portada1.png"
import sobreNosotros from "../images/sobreNosotros.png"





export const IndexPage = () => {



  return (
 <>
   <section className="hero hero-home">
      <div className="hero-backdrop" style={{ backgroundImage: `url(${portada1})` }} />
      <div className="hero-overlay" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-label">Nueva colección</p>
          <h1>Calzado y accesorios que elevan tu look sin esfuerzo</h1>
          <p>
            Diseños elegantes, tonos cálidos y piezas listas para combinar con tu día a día. Encuentra
            siluetas femeninas, acabados premium y precios pensados en pesos colombianos.
          </p>
          <div className="hero-actions">
            <a href="/store/calzado" className="btn hero-btn hero-btn-primary">Ver calzado</a>
            <a href="/store/accesorios" className="btn hero-btn hero-btn-secondary">Explorar accesorios</a>
          </div>
        </div>
      </div>
   </section>

      <section className="container categories">
        <ImgCategorias />
      </section>

      <section className="about-us">
        <div className="about-us-backdrop" style={{ backgroundImage: `url(${sobreNosotros})` }} />
        <div className="about-us-overlay" />
        <div className="container about-us-grid">
          <div className="text-about">
            <h2>Sobre Nosotros</h2>
            <p className="section-kicker">Una marca visualmente cálida, ordenada y pensada para vender con confianza</p>
            <p>
              En Calzado Gloria elegimos piezas que combinan presencia, comodidad y una estética cálida.
              Apostamos por colores neutros, dorados suaves y materiales que hacen fácil vestir bien todos los días.
            </p>
            <p>
              Nuestra tienda está pensada para encontrar rápido el par perfecto, el bolso ideal o ese accesorio
              que termina de cerrar el outfit.
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
