import { AxiosResponse } from "axios";

export interface HttpAdapter {
  get<ResponseData>(url: string):Promise<AxiosResponse<ResponseData>>;
  post<ResponseData,Params>(url:string,body?:Params):Promise<ResponseData>;
}