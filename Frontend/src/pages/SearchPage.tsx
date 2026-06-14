import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

import { searchProductosAction } from '../actions/search_productos.action'
import type { ProductProps } from '../data/db'
import Producto from '../componentes/Producto'
import { Pagination } from '../componentes/Pagination'
 
export const SearchPage = () => {
    const [searchParams] = useSearchParams()
    const name = searchParams.get('name') || ''
     
    
 
    const { data: searchData, isLoading } = useQuery({
        queryKey: ['search', { name }],
        queryFn: () => searchProductosAction({ name }),
        staleTime: 1000 * 60 * 5,
        enabled: !!name
    })
 
    if (isLoading) {
        return <div className="container">Buscando...</div>
    }
 
    return (
        <main className="container-xl mt-7 content-principal">
            <h2 className="text-center">
                Resultados de búsqueda: "{name}"
            </h2>
            
            {searchData?.productos?.length === 0 ? (
                <div className="text-center">
                    <p>No se encontraron productos para "{name}"</p>
                    <button 
                        className="btn btn-primary"
                        onClick={() => window.history.back()}
                    >
                        Volver
                    </button>
                </div>
            ) : (
                <div className="row mt-5">
                    {searchData?.productos?.map((item: ProductProps) => (
                        <Producto
                            key={item.id_prod}
                            item={item}
                      
                        />
                    ))}
                    <Pagination totalPages={searchData?.pagination?.totalPages ?? 1} />
                </div>
            )}

           
        </main>
    )
}

