import { useCallback, useState } from "react";

import { handleApiError } from "@/utils/api-error";

export const useApiRequest = () => {
  const [serverError, setServerError] = useState("");

  const execute = useCallback(
    async (action: () => Promise<void>): Promise<boolean> => {
      setServerError("");

      try {
        await action();
        return true;
      } catch (error) {
        const apiError = handleApiError(error);

        setServerError(apiError.message);
        return false;
      }
    },
    [],
  );

  const clearError = useCallback(() => {
    setServerError("");
  }, []);

  return {
    serverError,
    execute,
    clearError,
  };
};
