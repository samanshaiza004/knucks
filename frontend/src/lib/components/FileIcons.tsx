import React from "react";
import {
  MdOutlineImage,
  MdOutlineTextSnippet,
  MdAudiotrack,
  MdOndemandVideo,
  MdOutlineInsertDriveFile,
  MdFolder,
} from "react-icons/md";

const FILE_EXTENSIONS = {
  images: ["jpg", "png"],
  text: ["txt", "md"],
  audio: ["mp3", "wav", "flac", "ogg"],
  video: ["mp4", "mov", "avi"],
};

type FileIconProps = {
  fileName: string;
  isDirectory: boolean;
};

const FileIcon: React.FC<FileIconProps> = ({ fileName, isDirectory }) => {
  if (isDirectory) {
    return <MdFolder />;
  }
  const ext = fileName.split(".").pop();

  if (ext && FILE_EXTENSIONS.images.includes(ext)) {
    return <MdOutlineImage />;
  } else if (ext && FILE_EXTENSIONS.text.includes(ext)) {
    return <MdOutlineTextSnippet />;
  } else if (ext && FILE_EXTENSIONS.audio.includes(ext)) {
    return <MdAudiotrack />;
  } else if (ext && FILE_EXTENSIONS.video.includes(ext)) {
    return <MdOndemandVideo />;
  } else {
    return <MdOutlineInsertDriveFile />;
  }
};

export default FileIcon;
