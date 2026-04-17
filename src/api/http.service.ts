import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { toastService } from "../utils/toast.service";
import store from "../redux/store";

class Http {
  private unAuthorizedStatusCodes = [401, 403,404];

  private API_BASE_URL = import.meta.env.VITE_BASE_URL;

  private axios!: AxiosInstance;

  constructor() {
    this.initAxios();
  }

  private initAxios() {
    this.axios = axios.create({
      baseURL: this.API_BASE_URL,
      timeout: 30000,
    });



    this.axios.interceptors.request.use(
       (config: any) => {
        const token = localStorage.getItem("token");
        if(config.header){
          config.header["api_key"] = "1234";
          config.header["deviceId"] = deviceDetail(1);
          config.header["timezone"] = deviceDetail();
          config.header["deviceType"] = "Web";
          config.header["accept-language"] = "en";
        }
        if (token) {
          config.headers["authorization"] = `Bearer ${token}`;
        } else {
          config.headers["authorization"] =
            "Basic " + btoa("kulud" + ":" + "kulud@123");
        }
        return config;
      },
    );

    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        errorHandler(error);
      },
    );

    const errorHandler = (
      error: AxiosError<{ message: string; status: number }>,
    ) => {
      console.log(error.response, "**8");
      if (error && error.response) {
        const { message } = error.response.data;
        const {status}=error.response;
        window.location.href='/login';
        if (this.unAuthorizedStatusCodes.includes(status)) {
          localStorage.removeItem("token");
          store.dispatch({ type: "logout/LOGOUT" });
        } else {
          console.error(message);
        }
        toastService.showToast(message);
        return error;
      } else {
        return error;
      }
    };
  }

  post<T = any>(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return this.axios.post<T>(url, data, this.attachBaseURL(config));
  }

  put<T = any>(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axios.put<T>(url, data, this.attachBaseURL(config));
  }

  patch<T = any>(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axios.patch<T>(url, data, this.attachBaseURL(config));
  }

  delete<T = any>(url: string) {
    return this.axios.delete<T>(url);
  }

  get<T = any>(url: string, httpParams?: any, config?: AxiosRequestConfig) {
    // const updatedParams = this.parseDateToTimeStamp(httpParams);
    for (const item in httpParams) {
      if (
        httpParams[item] === "" ||
        httpParams[item] === undefined ||
        httpParams[item] === null
      ) {
        delete httpParams[item];
      }
    }
    let finalParams: any;
    if (httpParams) {
      finalParams = httpParams;
      //   finalParams = updatedParams;
    }
    return this.axios.get<T>(url, {
      ...this.attachBaseURL(config),
      params: finalParams,
    });
  }

  private attachBaseURL(config?: AxiosRequestConfig) {
    const finalConfig = config || {};
    if (finalConfig.baseURL) {
      return finalConfig;
    }
    return { ...finalConfig, baseURL: this.API_BASE_URL };
  }
}
export const http = new Http();

function deviceDetail(info?: number): string {
  /---1=device_token, 2=deviceId, 3=platform---/;
  switch (info) {
    case 1:
      return attachDeviceToken();
    case 2:
      return randomDeviceId();
    case 3:
      return "Web";
    default:
      return getTimeZone().toString();
  }
}

function attachDeviceToken() {
  return (Date.now() + Math.floor(Math.random() * 1000000) + 1).toString();
}

function randomDeviceId() {
  return window.navigator.userAgent.replace(/\D+/g, "");
}

function getTimeZone() {
  const date = new Date();
  const offset = date.getTimezoneOffset() * -1;
  return offset * 60 * 1000;
}
