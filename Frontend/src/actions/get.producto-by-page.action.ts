import { productApi } from "../api/producto.api";
import type { ProductoResponse, ProductProps } from "../data/db";



export const getProductosByPageAction = async (page: number, limit: number = 3, sizes?: string, minPrice?: number, maxPrice?: number, colors?: string, gender?: string): Promise<ProductoResponse> => {
    if (isNaN(page)) {
        page = 1;
    }

    if (isNaN(limit)) {
        limit = 3;
    }

    const { data } = await productApi.get<ProductoResponse>('/', {
            params: {
            limit,
            page,
            sizes,
            minPrice,
            maxPrice,
            colors,
            gender,
            // offset: (page - 1) * limit,

        }  // ✅ Enviar parámetros al backend
    });

    return data;
}



export const getProductoByIdAction = async (id: string): Promise<ProductProps> => {
    const { data } = await productApi.get(`/${id}`);
    return data.producto;
}

// export const getProductoByNameAction = async (name: string): Promise<ProductProps> => {
//     const { data } = await productApi.get(`/search/${name}`);
//     return data.producto;
// }