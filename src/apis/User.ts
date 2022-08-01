import service from './request';

export namespace User {
  export interface IBindResult {
    amount: number;
    class: number;
    className: string;
    combo: number;
    grade: string;
    headImg: string;
    initialPassword: boolean;
    isConfirm: number;
    isNewAppUser: boolean;
    mobile: string;
    name: string;
    nickName: string;
    num: number;
    schoolName: string;
    sex: string;
  }
  export interface ITokenParseResult {
    Head: string;
    Id: string;
    RealName: string;
    Sex: string;
    ShowInfo: string;
    aud: string;
    exp: number;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string | string[];
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
    iss: string;
    nbf: number;
  }
}

export const GetBindInfo = () => {
  return service.get<User.IBindResult>('/api/User/GetBindInfo');
};
