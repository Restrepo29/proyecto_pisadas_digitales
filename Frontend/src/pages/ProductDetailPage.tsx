import { use } from 'react'
import {  useParams } from 'react-router'
import { UserContext } from '../context/UseCartContext'
import { useQuery } from '@tanstack/react-query'
import { getProductoByIdAction } from '../actions/get.producto-by-page.action'
import { useSetImage } from '../hooks/SetImage'
 

export const ProductDetailPage = () => {
    const { id } = useParams()
      const { addToCart} = use(UserContext) 
       const { abrirImagen, ModalImagen } = useSetImage()
      


const { data: productos } = useQuery({ // ✅ Nombre descriptivo
  queryKey: ['producto',id],
  queryFn: () => getProductoByIdAction(id!),
  staleTime: 1000 * 60 * 5,
});


 
    return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-6">
                <img src={productos?.imageUrl_prod} alt={productos?.mane_prod} className="img-fluid mover-img-p"
                 onClick={() => { abrirImagen(productos?.imageUrl_prod!) }} />
            </div>
            <div className="col-md-6">
                <h1>{productos?.mane_prod}</h1>
                <p>{productos?.desc_prod}</p>
                <h3>${productos?.precio_prod}</h3>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(productos!) }
                >Agregar al Carrito</button>
            </div>
        </div>
          {ModalImagen}
    </div>

    


     

                      
                  
    )
}