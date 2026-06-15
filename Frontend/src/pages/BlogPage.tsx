import { Link } from "react-router"
import cuidadoZapatoImg from "../images/cuidadoZapato.png"
import pulidoZapatoCueroImg from "../images/pulidoZapatoCuero.png"
import kitCuidadoImg from "../images/kitCuidado.png"

export const BlogPage = () => {
  return (
    <main className="content-principal container">
      <h2 className="text-center">Nuestro Blog</h2>
      <p className="section-kicker text-center">Ideas de estilo, color y cuidado para acompañar la colección</p>

      <section className="container-blog">
        <div className="blog">
          <article className="entry-blog">
            <h2>Cómo cuidar zapatos de cuero</h2>
            <div className="image-blog">
              <img src={cuidadoZapatoImg} alt="Cuidado de zapatos de cuero" />
            </div>
            <div className="content-info-blog">
              <div className="info-meta-blog">
                <p>Fecha: <span>14 de Junio de 2026</span></p>
                <p>Escrito por: <span>Calzado Gloria</span></p>
              </div>
              <div className="entri-blog">
                <p>Para conservar el cuero natural, limpia primero con un paño seco y luego aplica una crema hidratante en capa fina.</p>
                <p>Si el zapato se moja, déjalo secar a temperatura ambiente con papel absorbente por dentro y evita el sol directo.</p>
                <p>Alternar pares durante la semana ayuda a mantener la forma, evita malos olores y alarga la vida útil del calzado.</p>
              </div>
              <Link className="btn max-width-30" to="/post">Leer más</Link>
            </div>
          </article>

          <article className="entry-blog">
            <h2>Errores comunes al limpiar tus zapatos</h2>
            <div className="image-blog">
              <img src={pulidoZapatoCueroImg} alt="Errores al limpiar calzado" />
            </div>
            <div className="content-info-blog">
              <div className="info-meta-blog">
                <p>Fecha: <span>14 de Junio de 2026</span></p>
                <p>Escrito por: <span>Calzado Gloria</span></p>
              </div>
              <div className="entri-blog">
                <p>Usar detergentes fuertes o cepillos muy duros puede dañar acabados delicados como ante, nobuck y cuero pulido.</p>
                <p>Otro error frecuente es guardar el calzado húmedo: esto genera deformaciones, manchas y mal olor.</p>
                <p>La regla clave es usar productos específicos para cada material y hacer mantenimiento ligero después de cada uso.</p>
              </div>
              <Link className="btn max-width-30" to="/post">Leer más</Link>
            </div>
          </article>

          <article className="entry-blog">
            <h2>Kit básico para el cuidado del calzado</h2>
            <div className="image-blog">
              <img src={kitCuidadoImg} alt="Kit básico de cuidado" />
            </div>
            <div className="content-info-blog">
              <div className="info-meta-blog">
                <p>Fecha: <span>14 de Junio de 2026</span></p>
                <p>Escrito por: <span>Calzado Gloria</span></p>
              </div>
              <div className="entri-blog">
                <p>Con un paño de microfibra, un cepillo de cerdas suaves, crema para cuero y spray protector puedes hacer mantenimiento en casa.</p>
                <p>Las hormas o relleno interno también son muy útiles para conservar la estructura del zapato y evitar pliegues profundos.</p>
                <p>Dedicar 10 minutos a la semana a este cuidado preventivo mantiene tus pares limpios, cómodos y con aspecto premium.</p>
              </div>
              <Link className="btn max-width-30" to="/post">Leer más</Link>
            </div>
          </article>
        </div>

        <aside>
          <h3>Otras entradas de blog</h3>
          <ul>
            <li><Link to="/post">Cómo cuidar zapatos de cuero</Link></li>
            <li><Link to="/post">Errores comunes al limpiar tus zapatos</Link></li>
            <li><Link to="/post">Kit básico para el cuidado del calzado</Link></li>
          </ul>
        </aside>
      </section>
    </main>
  )
}
