import {
  Authentication,
  AuthenticationProvider,
} from "@malagu/security/lib/node";

export interface TokenAuthenticationProvider extends AuthenticationProvider {
  authenticate(): Promise<TokenAuthentication | undefined>;
}

//自定义需要从token中解析并携带到程序中的参数
export interface TokenAuthentication extends Authentication {
  uid: string;
  phone: string;
  user_name: string;
  avatar: string;
}
