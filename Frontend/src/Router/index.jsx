import {Auth,Home,CreateBrand,UpdateBrands,GetAllBrands,Brands} from "../Pages"
import Layout from "../Layout"
import { createBrowserRouter } from "react-router-dom"
const router=createBrowserRouter([
    {
        path:"/",
        element:<Auth/>
    },
    {
        path:"/dashboard",
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<Home/>,
            },
            {
                path:"brands",
                element:<Brands/>,
                children:[
                    {
                        index:true,
                        element:<GetAllBrands/>
                    },
                    {
                        path:"create",
                        element:<CreateBrand/>
                    },
                    {
                        path:"update",
                        element:<UpdateBrands/>
                    }
                ]
            },
           
        ]
    }
  
])

export default router