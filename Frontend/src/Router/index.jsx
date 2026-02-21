import { Auth, Home, CreateBrand, UpdateBrands, GetAllBrands, Brands, Products, GetAllProducts, CreateProducts, UpdateProducts, Category, GetAllCategory, CreateCategory, UpdateCategory } from "../Pages"
import Layout from "../Layout"
import { createBrowserRouter } from "react-router-dom"
const router = createBrowserRouter([
    {
        path: "/",
        element: <Auth />
    },
    {
        path: "/dashboard",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "brands",
                element: <Brands />,
                children: [
                    {
                        index: true,
                        element: <GetAllBrands />
                    },
                    {
                        path: "create",
                        element: <CreateBrand />
                    },
                    {
                        path: "update",
                        element: <UpdateBrands />
                    }
                ]
            },
            {
                path: "products",
                element: <Products />,
                children: [
                    {
                        index: true,
                        element: <GetAllProducts />
                    },
                    {
                        path: "create",
                        element: <CreateProducts />
                    },
                    {
                        path: "update",
                        element: <UpdateProducts />
                    },
                    {
                        path:":id/:name",
                        element:<UpdateProducts/>
                    }
                ]
            },
            {
                path: "category",
                element: <Category />,
                children: [
                    {
                        index: true,
                        element: <GetAllCategory />
                    },
                    {
                        path: "create",
                        element: <CreateCategory />
                    },
                    {
                        path: "update",
                        element: <UpdateCategory />
                    }
                ]
            },
        ]
    }

])

export default router