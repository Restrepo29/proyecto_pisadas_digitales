import { Link } from "react-router";
import { useEffect, useState } from "react";
import { categorias, type PropsCategorias } from "../data/categorias";
import calzadoPortada from "../images/calzado-portada.png";
import bolsoPortada from "../images/bolso-portada.png";
import accesorioPortada from "../images/accesorio-portada.png";

const categoryImages: Record<string, string> = {
  "calzado-portada": calzadoPortada,
  "bolso-portada": bolsoPortada,
  "accesorio-portada": accesorioPortada,
};

export const ImgCategorias = () => {
  const [category, setCategory] = useState<PropsCategorias[]>([]);

  useEffect(() => {
    setCategory(categorias);
  }, []);

  return (
    <>
      <h2 className="text-center">Categorias de Productos</h2>
      <p className="section-kicker text-center">Selecciona tu estilo y entra directo a la colección</p>
      <div className="category-list">
        {category.map((element) => (
          <div className="category" key={element.id}>
            <img
              src={categoryImages[element.image] ?? calzadoPortada}
              alt={element.description}
            />
            <Link to={element.path}>{element.description}</Link>
          </div>
        ))}
      </div>
    </>
  )
}
