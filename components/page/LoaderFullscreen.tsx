"use client";
import { motion } from "framer-motion";

interface LoaderFullscreenProps {
  isVisible: boolean;
}

const LoaderFullscreen = ({ isVisible }: LoaderFullscreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 99999999,
        backgroundColor: "#0F2854",
        pointerEvents: isVisible ? "auto" : "none",
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="loader" />
    </motion.div>
  );
};

export default LoaderFullscreen;
