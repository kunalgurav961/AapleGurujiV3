import { useEffect } from "react";
import api from "../../../config/api";

export const useLeadCapture = (email, shouldCapture = false) => {
  useEffect(() => {
    if (!shouldCapture || !email) return;

    const handleBeforeUnload = async () => {
      try {
        await api.post("/leads/abandon", { email });
      } catch (error) {
        console.error("Failed to mark lead as abandoned:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [email, shouldCapture]);
};

export default useLeadCapture;
