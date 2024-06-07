import { useQuery } from "@tanstack/react-query"
import axios from "axios";


const useAllProducts = () => {

    const {data:allProducts=[],refetch,isLoading}= useQuery({
        queryKey: ['allProducts'],
        queryFn: async()=>{
            const res = await axios.get(`https://reactjr.coderslab.online/api/products`)
            return res.data;
        }
       
    })
  return [allProducts, refetch,isLoading ]
  
}

export default useAllProducts;
