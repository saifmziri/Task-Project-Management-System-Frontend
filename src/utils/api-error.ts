import axios from "axios";

import type { ApiErrorResponse, ValidationErrors } from "../types/api.types";

export interface HandledApiError {
  message: string;
  validationErrors?: ValidationErrors;
}

export function handleApiError(error: unknown): HandledApiError {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const response = error.response?.data;

    const validationErrors = response?.errors ?? undefined;

    const firstValidationError = validationErrors
      ? Object.values(validationErrors)[0]?.[0]
      : undefined;

    return {
      message:
        firstValidationError ?? response?.message ?? "Something went wrong.",
      validationErrors,
    };
  }

  return {
    message: "Unexpected error occurred.",
  };
}
