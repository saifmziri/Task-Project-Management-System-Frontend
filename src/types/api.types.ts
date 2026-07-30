export type ValidationErrors = Record<string, string[]>;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: null;
  meta: null;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  data: null;
  errors: ValidationErrors | null;
  meta: {
    code: string;
  } | null;
}