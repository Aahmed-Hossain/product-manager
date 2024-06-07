import { useQuery } from "@tanstack/react-query"
import axios from "axios";

const useAllOrders = () => {

    const {data:allOrders=[],refetch,isLoading}= useQuery({
        queryKey: ['allOrders'],
        queryFn: async()=>{
            const res = await axios.get(`https://reactjr.coderslab.online/api/orders`)
            return res.data;
        }
    })
  return [allOrders, refetch, isLoading ]
  
}

export default useAllOrders;