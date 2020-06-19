export interface ILoginModel {
    email: string;
    password: string;
}

export interface ISignupModel {
    email: string;
    password: string;
    name: string;
}

export interface IResponse {
    token: string;
    userName: string;
}

