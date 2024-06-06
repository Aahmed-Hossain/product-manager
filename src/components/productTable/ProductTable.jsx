import useAllProducts from "../../hooks/useAllProducts";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Pagination from "../pagination/Pagination";
const ProductTable = () => {
  const [allProducts,,isLoading] = useAllProducts();
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  if(isLoading) 
    return <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop:  '6rem',
      }}>
      <CircularProgress sx={{ color: '#0F9ED5' }} />
    </Box>

  return (
    <div className="px-1 md:px-4">
      <table className="w-full border-separate">
        <thead>
          <tr className="text-center bg-[#0F9ED5] text-white ">
            <th className="px-1 py-2 hidden md:block">ID</th>
            <th className="px-1 py-2">Name</th>
            <th className="px-1 py-2">Brand</th>
            <th className="px-1 py-2">Type</th>
            <th className="px-1 py-2 hidden md:block">Created At </th>
            <th className="px-1 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProducts?.data?.data?.map((product, idx) => (
            <tr
              key={idx}
              className="text-sm lg:font-medium  odd:bg-[#CCDFEF] even:bg-[#E7F0F7] text-center"
            >
              <td className=" px-1 py-2 hidden md:block">{(idx+1)}</td>
              <td className="px-1 py-2">{product.name}</td>
              <td className="px-1 py-2">{product.brand}</td>
              <td className=" px-1 py-2 ">{product.type}</td>
              <td className="px-1 py-2 hidden md:block">{formatDate(product.created_at)}</td>
              <td className="px-1 py-2 text-red-400 space-x-1">
                <span className="cursor-pointer hover:text-red-600">View </span>
                |
                <span className="cursor-pointer hover:text-red-600">Edit </span>
                |
                <span className="cursor-pointer hover:text-red-600">
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination 
  currentPage={1} 
  totalPages={4} 
  onPageChange={(page) => console.log(`Page changed to ${page}`)} 
/>
    </div>
  );
};

export default ProductTable;
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import useAllProducts from '../../hooks/useAllProducts';

// const columns = [
//   { id: 'ID', label: 'ID', minWidth: 50 },
//   { id: 'Name', label: 'Name', minWidth: 150 },
//   { id: 'Brand', label: 'Brand', minWidth: 150, align: 'right' },
//   { id: 'Type', label: 'Type', minWidth: 150, align: 'right' },
//   { id: 'CreatedAt', label: 'Created At', minWidth: 150, align: 'right' },
//   { id: 'Actions', label: 'Actions', minWidth: 150, align: 'right' },
// ];

// const ProductTable = () => {
//   const [allProducts, , isLoading] = useAllProducts();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth, backgroundColor: '#00A6E9', color: 'white' }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {allProducts.data.data
//               .map((product) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={product.id}>
//                     {columns.map((column) => {
//                       const value = column.id === 'CreatedAt' ? formatDate(product.created_at) : product[column.id.toLowerCase()];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.id === 'Actions' ? (
//                             <div>
//                               <span style={{ color: 'red', cursor: 'pointer' }}>View</span> |{' '}
//                               <span style={{ color: 'red', cursor: 'pointer' }}>Edit</span> |{' '}
//                               <span style={{ color: 'red', cursor: 'pointer' }}>Delete</span>
//                             </div>
//                           ) : (
//                             value || '...'
//                           )}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={allProducts.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// };

// export default ProductTable;
