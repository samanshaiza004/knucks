type DirectoryBurronProps = {
  name: string;
  onClick: () => void;
};

const DirectoryButton: React.FC<DirectoryBurronProps> = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 transition duration-200"
    >
      {name}
    </button>
  );
};

export default DirectoryButton;
