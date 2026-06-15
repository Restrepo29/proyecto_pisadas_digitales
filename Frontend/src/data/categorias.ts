 export interface PropsCategorias {
    id: number;
    image: string;
    description: string;
    path: string;
}



export const categorias: PropsCategorias[] = [
  {
    id: 1,
    image: "calzado-portada",
    description: "Calzado",
    path: "/store/calzado",
  },
  {
    id: 2,
    image: "bolso-portada",
    description: "Bolsos",
    path: "/store/bolsos",
  },
    {
    id: 3,
    image: "accesorio-portada",
    description: "Accesorios",
    path: "/store/accesorios",
  },
];
