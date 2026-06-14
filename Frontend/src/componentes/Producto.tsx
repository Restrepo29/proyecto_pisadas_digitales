
import type { ProductProps } from "../data/db"
import { Link } from "react-router"
import { useSetImage } from "../hooks/SetImage"


export default function Producto({ item }: { item: ProductProps }) {
       const { abrirImagen, ModalImagen } = useSetImage()


    return (
        <div className="col-md-4 col-lg-4 my-4 row align-items-center">
             
            <div className="col-6">
                <img className="img-fluid mover-img" src={item.imageUrl_prod} alt="imagen producto"
                    onClick={() => { abrirImagen(item.imageUrl_prod) }}
                    style={{ cursor: 'pointer' }}
                     />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{item.mane_prod}</h3>
                <p>{item.desc_prod}</p>
                <p className="fw-black text-primary fs-3">${item.precio_prod}</p>
              <Link to={`/producto/${item.id_prod}`} className="btn btn-dark w-100" >Ver Producto</Link>
     
            </div>

            
             {/* Modal ahora viene del hook */}
             {ModalImagen} 

         </div>
    )
}


