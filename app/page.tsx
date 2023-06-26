"use client";

import { useEffect, useRef, useState } from "react";
import { codeX } from "./assets/code";
export default function Home() {
  const [codeIndex, setCodeIndex] = useState(0);
  const [isWaitingInput, setIsWaitingInput] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleKeyDown = async () => {
      if (!isWaitingInput) setIsWaitingInput(true);
      setCodeIndex((prev) => prev + Math.random() * 40);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        videoRef.current?.pause();
      }, 250);

      videoRef.current?.play();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isWaitingInput]);

  const renderCode = () => {
    const code = codeX.slice(0, codeIndex);
    const character = codeX.at(codeIndex);
    if (!character) {
      setCodeIndex(0);
    }
    if (character === "\n") {
      return (
        <>
          {code}
          <br />
        </>
      );
    }
    return (
      <>
        {code}
        {character}
      </>
    );
  };

  return (
    <main className='min-h-screen'>
      {!isWaitingInput ? (
        <h1 className='fixed m-auto z-20 text-3xl w-screen min-h-screen flex items-center justify-center bg-opacity-70 bg-black font-black  text-[--text]'>
          {"Press any key to start ..."}
        </h1>
      ) : (
        <div
          className='absolute 
        bg-black bg-opacity-40 w-full
        flex flex-col-reverse
        top-0 max-h-screen overflow-hidden z-30 text-[--text] text-md font-light p-2'
        >
          {renderCode()}
        </div>
      )}

      <video ref={videoRef} src='/video.webm' />
    </main>
  );
}
