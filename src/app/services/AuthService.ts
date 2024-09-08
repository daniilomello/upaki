import { httpClient } from './httpClient';

interface ISignUpDTO {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface ISignInDTO {
  email: string;
  password: string;
}

interface IConfirmDTO {
  email: string;
  code: string;
}

interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

interface IConfirmResponse {
  accessToken: string;
}

export class AuthService {
  static async signUp({ name, lastname, email, password }: ISignUpDTO) {
    const { data } = await httpClient.post('/auth/signup', {
      firstName: name,
      lastName: lastname,
      email,
      password,
    });

    return data;
  }

  static async signIn({ email, password }: ISignInDTO) {
    const { data } = await httpClient.post<ISignInResponse>('/auth/signin', {
      email,
      password,
    });

    return data;
  }
  
  static async confirm({ email, code }: IConfirmDTO) {
    const { data } = await httpClient.post<IConfirmResponse>('/auth/confirm', {
      email,
      code,
    });

    return data;
  }

  static async refreshToken(refreshToken: string) {
    const { data } = await httpClient.post<ISignInResponse>('/auth/refresh', {
      refreshToken,
    });

    return data;
  }
}
