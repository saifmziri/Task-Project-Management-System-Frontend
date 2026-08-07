import axios from "axios";

import type { ApiErrorResponse, ValidationErrors } from "../types/api.types";

export interface HandledApiError {
  message: string;
  validationErrors?: ValidationErrors;
}

export function handleApiError(error: unknown): HandledApiError {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const response = error.response?.data as ApiErrorResponse | undefined;

    const validationErrors = response?.errors ?? undefined;

    const firstValidationError = Object.values(validationErrors ?? {})[0]?.[0];

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
