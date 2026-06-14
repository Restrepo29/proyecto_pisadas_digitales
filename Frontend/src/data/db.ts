
export interface ProductoResponse {
  pagination: {
    total: number;
    pages: number;
    totalPages: number;
  };
  productos: ProductProps[];
}


export interface ProductProps {
    id_prod: number;
    imageUrl_prod: string;
    mane_prod: string;
    precio_prod: number;
  desc_prod: string;
  size_prod: string[];
}

export type Size = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface cartItem extends ProductProps {
    quantity: number;  
}

