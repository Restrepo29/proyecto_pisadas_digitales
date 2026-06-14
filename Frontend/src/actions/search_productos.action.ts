import { productApi } from "../api/producto.api";


// search_productos.action.ts
export const searchProductosAction = async (options: { name?: string }) => {
    if (!options.name) return { productos: [], pagination: { totalPages: 0 } }
    
    const { data } = await productApi.get(`/search/${options.name}`)
    return data
}