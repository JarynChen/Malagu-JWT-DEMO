import { Autowired, Component } from "@malagu/core";
import {
  AuthenticationProvider,
  BASE_AUTHENTICATION_PROVIDER_PRIORITY,
} from "@malagu/security/lib/node";
import { Context } from "@malagu/web/lib/node";
import { TokenAuthentication } from "./auth_protocol";
import { TokenUtils } from "../token-utils/token";

@Component(AuthenticationProvider)
export class BaseAuthenticationProvider implements AuthenticationProvider {
  priority = BASE_AUTHENTICATION_PROVIDER_PRIORITY + 1000;
  @Autowired()
  private readonly tokenUtils: TokenUtils;
  async authenticate(): Promise<TokenAuthentication | undefined> {
    const request = Context.getRequest();
    let header_token = request.get("Token")!.trim();
    let header_phone = request.get("Phone")!.trim();

    try {
      const tokenResult = await this.tokenUtils.verifyToken(
        header_token,
        header_phone
      );

      return {
        name: tokenResult.user_name,
        uid: tokenResult.uid,
        phone: header_phone,
        user_name: tokenResult.user_name,
        avatar: tokenResult.avatar,
        principal: [],
        credentials: "",
        policies: [],
        authenticated: true,
        next: true,
      };
    } catch (error) {
      return {
        name: "",
        uid: "",
        phone: "",
        user_name: "",
        avatar: "",
        principal: [],
        credentials: "",
        policies: [],
        authenticated: false,
        next: true,
      };
    }
  }

  async support(): Promise<boolean> {
    const request = Context.getRequest();
    let header_token = request.get("Token"); //Header中的Key大家可以根据需要自定义
    let header_phone = request.get("Phone");
    if (!header_token) {
      return false;
    }
    if (!header_phone) {
      return false;
    }
    return true;
  }
}
