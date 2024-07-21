import { useRef, useEffect, useState } from "react";
import { ReturnDirItems, MoveDir } from "../../../wailsjs/go/main/App";
import WaveSurfer from "wavesurfer.js";
import DirectoryButton from "./DirectoryButton";
import FileButton from "./FileButton";

const FILE_EXTENSIONS = {
  images: ["jpg", "png"],
  text: ["txt", "md"],
  audio: ["mp3", "wav", "flac", "ogg"],
  video: ["mp4", "mov", "avi"],
};

export type File = {
  name: string;
  location: string;
  is_directory: boolean;
};

const INITIAL_DIRECTORY: string[] = ["/home", "saman", "dev"];

function FileSpace() {
  const [currentDirectory, setCurrentDirectory] =
    useState<string[]>(INITIAL_DIRECTORY);
  const [directoryItems, setDirectoryItems] = useState<File[]>([]);
  const [currentAudio, setCurrentAudio] = useState<string>("");

  const getCurrentDir = () => {
    ReturnDirItems(currentDirectory).then((res) => {
      setDirectoryItems(res);
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const NewDir = (dir: string) => {
    MoveDir(currentDirectory, dir)
      .then((res) => setCurrentDirectory(res))
      .then(() => {
        getCurrentDir();
        scrollToTop();
      });
  };

  const handleFileClick = (item: File) => {
    const ext = item.name.split(".").pop();
    if (item.is_directory) {
      NewDir(item.name);
    } else if (ext && FILE_EXTENSIONS.audio.includes(ext)) {
      setCurrentAudio(item.location);
    }
  };

  const waveformRef = useRef(null);

  useEffect(() => {
    if (waveformRef.current) {
      let wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#4F4A85",
        progressColor: "#383351",
        url: currentAudio,
      });

      wavesurfer.on("interaction", () => {
        wavesurfer.play();
      });
    }
  }, [currentAudio]);

  useEffect(() => {
    getCurrentDir();
  }, [currentDirectory]);

  return (
    <div className="flex w-full flex-col">
      <div className="sticky top-0 z-10 px-1 h-8 bg-white">
        <div className="inline-flex shadow-sm" role="group">
          {currentDirectory.map((item, index) => (
            <DirectoryButton
              key={index}
              name={item}
              onClick={() => NewDir(item)}
            />
          ))}
        </div>
      </div>

      <div className="overflow-auto px-1 py-1">
        <div className="grid grid-cols-3">
          {directoryItems.map((item, index) => (
            <FileButton
              key={index}
              file={item}
              onClick={() => handleFileClick(item)}
            />
          ))}
        </div>
        <div>
          Current audio file: {currentAudio}
          <div ref={waveformRef}></div>
        </div>
      </div>
    </div>
  );
}

export default FileSpace;
