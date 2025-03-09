export type ActionResponse<T> = {
  data: T | null;
  error: {
    message: string;
    type: string;
  } | null;
};
