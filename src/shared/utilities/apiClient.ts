import axios from 'axios';
export const apiClient = (url: string, headers?: {}) => {
  return axios.create({
    baseURL: url,
    headers: headers || {},
  });
};

export interface ResponseInterface {
  data: {};
}
