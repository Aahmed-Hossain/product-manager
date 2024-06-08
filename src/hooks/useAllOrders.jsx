import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { useState,  useCallback } from 'react';
import { debounce } from './../utils/debounce';

const useAllOrders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [seachQuery, setSearchQuery] = useState('');
    const {data:allOrders=[],refetch,isLoading}= useQuery({
        queryKey: ['allOrders'],
        queryFn: async()=>{
            const res = await axios.get(`https://reactjr.coderslab.online/api/orders?search=${seachQuery}&per_page=10&page=${currentPage}`)
            return res.data;
        }
    })

    const handleChangePage = (pageNumber) => {
        refetch();
        setCurrentPage(pageNumber);
      };
    
      const debouncedRefetch = useCallback(
        debounce(() => refetch(), 600),
        []
      );
    
      const handleSearch = (searchTerm) => {
        setSearchQuery(searchTerm);
        debouncedRefetch();
      };
  return [allOrders, refetch, isLoading, handleChangePage,
    currentPage,
    handleSearch,
    seachQuery, ]
  
}

export default useAllOrders;