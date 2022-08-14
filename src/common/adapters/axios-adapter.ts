
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
export class AxiosAdapter implements HttpAdapter{
  private  axios:AxiosInstance = axios;
  /* async get<ResponseData>(url: string): Promise<ResponseData> {
    try {
      const {data} = await this.axios.get<ResponseData>(url);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error('esto es un error -revisar los logs');
    }
    
  }; */
  get=<ResponseData>(url: string): Promise<AxiosResponse<ResponseData>> => this.axios.get<ResponseData>(url);
  post=<ResponseData,Params>(url: string,body?:Params): Promise<ResponseData> => this.axios.post(url,body);

} 