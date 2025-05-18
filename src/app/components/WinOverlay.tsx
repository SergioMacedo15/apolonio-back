"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

interface WinOverlayProps {
  show: boolean;
  width: number;
  height: number;
}

export default function WinOverlay({ show, width, height }: WinOverlayProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (show && audioRef.current) {
      sessionStorage.clear();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [show]);

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed top-4 right-4 text-white text-right z-[10001] select-none">
              <div className="font-bold mb-2 text-lg">Créditos</div>
              <div>Gustavo Cruz</div>
              <div>Sergio Macedo</div>
              <div>Pedro Borges</div>
              <div>Tiago Silvério</div>
            </div>

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width,
                height,
                pointerEvents: "none",
                zIndex: 9999,
              }}
            >
              <Confetti width={width} height={height} numberOfPieces={300} recycle={true} />
            </div>

            <motion.div
              className="text-white font-bold mb-6 select-none"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              style={{ fontSize: "4rem", zIndex: 10000 }}
            >
              You Win
            </motion.div>

            <motion.div
              className="text-white select-none"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              style={{ fontSize: "12rem", zIndex: 10000 }}
            >
              🏆
            </motion.div>

            <motion.button
              className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl z-50 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleRestart}
            >
              🔄 Restart Game
            </motion.button>
          </motion.div>

          <audio ref={audioRef} src="/win.mp3" preload="auto" />
        </>
      )}
    </AnimatePresence>
  );
}
