import { AxiosError } from "axios";

export class ApiError extends Error {
  constructor(...args: any) {
    super(...args);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ConfigError extends ApiError {}
export class RestApiError extends ApiError {
  constructor(e:Error|AxiosError) {
    let message = e.message
    if(e instanceof AxiosError) {
      message = e?.response?.data ? `${e.response.data?.message} [${e.response.data?.statusCode}]` : e.message
    }
    super(`Rest Api Error: ${message}`)
  }
}
export class XmlApiError extends ApiError {
  constructor(e:Error|AxiosError) {
    let message = e.message
    if(e instanceof AxiosError) {
      message = e?.response?.data ? `${e.response.data?.message} [${e.response.data?.statusCode}]` : e.message
    }
    super(`XML Api Error: ${message}`)
  }
}