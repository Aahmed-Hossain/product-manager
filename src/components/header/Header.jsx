/* eslint-disable react/prop-types */

const Header = ({children}) => {
    return (
      <h2 className="h-20 bg-[#83CBEB] flex justify-center items-center">
  <h4 className="w-[20rem] text-center bg-[#C1E5F5] text-3xl py-2 rounded-lg shadow-xl">{children}</h4>
      </h2>
    )
  }
  
  export default Header