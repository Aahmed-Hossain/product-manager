/* eslint-disable react/prop-types */

const SelectedOrdersModal = ({closeModal}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
    <div className="bg-white rounded-md shadow-lg px-6 md:px-8 py-4 md:py-6 w-[90%] max-h-full overflow-y-auto">
      <h3 className="font-bold text-lg text-center my-4 ">
      Select Variants
      </h3>


      {/* close next button */}
      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          className="bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button className=" bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4">
          Next
        </button>
      </div>
    </div>
  </div>
  )
}

export default SelectedOrdersModal