import { useEffect } from "react";
import api from "../../../config/api";

export const useLeadCapture = (email, shouldCapture = false) => {
  useEffect(() => {
    if (!shouldCapture || !email) return;

    const handleBeforeUnload = () => {
      const endpoint = api.getUri({ url: "/leads/abandon" });
      const payload = new URLSearchParams({ email });

      navigator.sendBeacon(endpoint, payload);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [email, shouldCapture]);
};

export default useLeadCapture;
