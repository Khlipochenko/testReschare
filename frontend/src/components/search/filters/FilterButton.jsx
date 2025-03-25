export const FilterButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center py-2 px-3 ml-4 mt-4 text-sm rounded-md bg-custom-text-green sm:hover:bg-custom-text-brown text-white"
    >
      {children}
    </button>
  );
};
