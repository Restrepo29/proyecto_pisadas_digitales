import { RouterProvider } from "react-router"
import { appRouter } from "./router/AppRouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"


const queryClient = new QueryClient()


export const MueblesApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter}/>
      <ReactQueryDevtools  initialIsOpen={false}/>
    </QueryClientProvider>
  )
}
