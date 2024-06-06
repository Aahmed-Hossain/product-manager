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

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const useAllProducts = () => {
//   const { data: allProducts = [], refetch, isLoading, isError, error } = useQuery({
//     queryKey: ['allProducts'],
//     queryFn: async () => {
//       const res = await axios.get(`https://reactjr.coderslab.online/api/products`);
//       console.log("Response Data:", res.data);
//       return res.data;
//     }
//   });

//   console.log("All Products:", allProducts);
//   console.log("Is Loading:", isLoading);
//   if (isError) console.error("Error fetching products:", error);

//   return [allProducts, refetch, isLoading];
// };

// export default useAllProducts;
