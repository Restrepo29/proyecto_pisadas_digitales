import { useQuery } from "@tanstack/react-query";
import { getProductosByPageAction } from "../actions/get.producto-by-page.action";
import { useParams, useSearchParams } from "react-router";


export const useGetProduct = () => {

  const [searchParams] = useSearchParams();

  const { gender } = useParams();

  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '3';
  const sizes = searchParams.get('sizes') ?? '';
  const price = searchParams.get('price') || 'any';
  const colors = searchParams.get('colors') || '';
  console.log({ colors })

  // console.log({ price})

  let minPrice = undefined;
  let maxPrice = undefined;


  switch (price) {
    case 'any':
      break;
    case '0-50':
      minPrice = 0;
      maxPrice = 50000;
      break;
    case '50-100':
      minPrice = 50000;
      maxPrice = 100000;
      break;
    case '100-200':
      minPrice = 100000;
      maxPrice = 200000;
      break;
    case '200+':
      minPrice = 200000;
      maxPrice = undefined;

  }


  const { data } = useQuery({
    queryKey: ['producto', 'page', page, 'limit', limit, 'size', sizes, 'minPrice', minPrice, 'maxPrice', maxPrice, 'colors', colors, 'gender', gender],//espacio en memoria donde guardar peticion
    queryFn: () => {
      console.log('🌐 Haciendo petición a API - Página:', page);
      return getProductosByPageAction(+page, +limit, sizes, minPrice, maxPrice, colors, gender)
    },
    staleTime: 1000 * 60 * 5, // 5 minutes


  });


  return {
    data

  }
}
