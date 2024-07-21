import FileIcon from "./FileIcons";
import { File } from "./FileSpace";
type FileButtonProps = {
  file: File;
  onClick: () => void;
};

const FileButton: React.FC<FileButtonProps> = ({ file, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="truncate overflow-hidden text-start flex px-2 py-1 text-gray-900 text-lg border transition duration-200 hover:border-slate-400 focus:ring-blue-300 focus:text-blue-300"
    >
      <div className="items-center mt-1 pr-1">
        <FileIcon fileName={file.name} isDirectory={file.is_directory} />
      </div>
      {file.name}
    </button>
  );
};

export default FileButton;
