import React from "react";
import { motion } from "framer-motion";

const LoaderFullscreen = () => {
  return (
    <motion.div
      className="fixed flex items-center justify-center w-full h-full overflow-y-hidden"
      style={{ zIndex: "99999999", backgroundColor: "#0F2854", pointerEvents: "none" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: .6,  }}
    >
      <div className="loader"></div>
    </motion.div>
  );
};

export default LoaderFullscreen;
