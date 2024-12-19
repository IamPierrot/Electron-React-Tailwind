import { useState, useEffect } from "react";

const CustomTitleBar = () => {
  const isElectron = window?.ipcRenderer;
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (isElectron && window.ipcRenderer) {
      window.ipcRenderer.on("window-maximized", () =>
        setIsMaximized(prevState => !prevState),
      );

      return () => {
        window.ipcRenderer?.removeAllListeners("window-maximized");
      };
    }
  }, []);

  if (!isElectron) return null;

  const minimize = () => window.ipcRenderer?.send("window-minimize");
  const maximize = () => window.ipcRenderer?.send("window-maximize");
  const close = () => window.ipcRenderer?.send("window-close");

  return (
    <div className="drag flex h-[32px] w-full items-center justify-between bg-[#2f3136] shadow-md">
      <div className="flex h-full items-center px-2">
        {/* App icon or title can go here */}
      </div>
      <div className="flex h-full">
        <button
          onClick={minimize}
          className="no-drag flex h-full w-[45px] items-center justify-center hover:bg-[#404249]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect fill="#dcddde" width="10" height="1" x="1" y="6" />
          </svg>
        </button>
        <button
          onClick={maximize}
          className="no-drag flex h-full w-[45px] items-center justify-center hover:bg-[#404249]"
        >
          {isMaximized ? (
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path
                fill="none"
                stroke="#dcddde"
                d="M3.5,3.5v5h5v-5h-5z M1.5,1.5v5h1v-4h4v-1h-5z"
              />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12">
              <rect
                width="10"
                height="10"
                x="1"
                y="1"
                stroke="#dcddde"
                fill="none"
              />
            </svg>
          )}
        </button>
        <button
          onClick={close}
          className="no-drag flex h-full w-[45px] items-center justify-center hover:bg-[#ED4245]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path
              fill="#dcddde"
              d="M7.06 6l2.72-2.72a.75.75 0 0 0-1.06-1.06L6 4.94 3.28 2.22a.75.75 0 0 0-1.06 1.06L4.94 6 2.22 8.72a.75.75 0 1 0 1.06 1.06L6 7.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L7.06 6z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomTitleBar;
