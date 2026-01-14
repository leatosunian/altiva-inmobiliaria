"use client";
import { useEffect, useState } from "react";

export function usePageLoader() {
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const onLoad = () => setPageReady(true);

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => window.removeEventListener("load", onLoad);
  }, []);

  return pageReady;
}