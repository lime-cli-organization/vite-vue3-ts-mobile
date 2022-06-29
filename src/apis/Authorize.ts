import { translateParams } from '@/utils/tools';
import service from './request';

export namespace Authorize {
  export interface IImage {
    contentType: string;
    fileContents: string;
  }

  export interface IImageCodeResult {
    key: string;
    image: IImage;
  }

  export interface ILoginParams {
    username: string;
    password: string;
    key: string;
    code: string;
  }

  export interface ILoginResult {
    data: string;
  }
}

export const GetImageCode = () => {
  return service.get<Authorize.IImageCodeResult>('/api/Authorize/GetImage');
};

export const Login = (data: Authorize.ILoginParams) => {
  return service.post<Authorize.ILoginResult>(
    `/api/Authorize/LoginWithCode?${translateParams(data)}`,
    data,
  );
};
