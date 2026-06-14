import type { ProductProps } from "../data/db"
import { useGetProduct } from "../hooks/useGetProduct";
import Producto from "./Producto"


export const ProductsGrid = () => {
     const { data } = useGetProduct();
  return (
  <div className="row mt-5">
              {data?.productos?.map((item: ProductProps) => (
                <Producto
                  key={item.id_prod}
                  item={item}
                />
              ))}
            </div>
  )
}
