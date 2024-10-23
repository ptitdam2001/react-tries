/**
 * This file is used during sdk code generation.
 *
 * @see https://orval.dev/guides/custom-axios
 */
import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { axiosFetchedUrlStore } from "./axios-fetched-url-store";

const getBaseUrl = () => {
  return "/api/v1";
};

const getAxiosConfig = (): AxiosRequestConfig => ({
  baseURL: getBaseUrl(),
  xsrfCookieName: "MY-XSRF-TOKEN",
  xsrfHeaderName: "X-MY-XSRF-TOKEN",
  withCredentials: true,
});

const AXIOS_INSTANCE = Axios.create();

/**
 * Create custom Axios instance with credentials/cookie handled.
 */
export const customAxiosInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  return AXIOS_INSTANCE({
    ...getAxiosConfig(),
    ...config,
    ...options,
  }).then(({ data }) => {
    if (config.url) {
      axiosFetchedUrlStore.set(data, config.url);
    }

    return data;
  });
};

// With react-query we want to be able to override the return error type
export type ErrorType<Error = unknown> = AxiosError<Error>;
