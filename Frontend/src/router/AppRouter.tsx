import { createBrowserRouter, Navigate } from "react-router";
import { MueblesLayout } from "../layout/MueblesLayout";
import { IndexPage, AboutPage, StorePage, BlogPage,  ProductDetailPage, SearchPage } from "../pages";

export const appRouter=createBrowserRouter([

    {
        path: "/",
        element: <MueblesLayout/>,
        children:[
            {
                index: true,
                element: <IndexPage/>
            },

            {
                path: "about",
                element: <AboutPage/>
            },
            {
                path: "store/:gender",
                element: <StorePage/>
            },
            {
                path: "blog",
                element: <BlogPage/>
            },
           
           
            {
                path: "producto/:id", //ruta dinamica
                element: <ProductDetailPage/>
            },
            {
                path: "*",
                element: <Navigate to="/" />
            },
             { path: 'search',
                 element: <SearchPage /> },
        
        ]
    }
])

