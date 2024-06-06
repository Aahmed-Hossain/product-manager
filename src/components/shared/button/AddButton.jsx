/* eslint-disable react/prop-types */
const AddButton = ({onClick, children }) => {

    return (
      <button onClick={onClick} className="bg-[#83CBEB] hover:bg-[#5ebae2] text-white font-bold py-1 w-[7rem] rounded-md border-2 border-blue-500 text-xl">
        {children}
      </button>
    );
  };
  
  export default AddButton;