import {
  AuthenticationSuccessHandler,
  Authentication,
} from "@malagu/security/lib/node";
import { Component } from "@malagu/core";

@Component({ id: AuthenticationSuccessHandler, rebind: true })
export class DefaultAuthenticationSuccessHandler
  implements AuthenticationSuccessHandler {

  async onAuthenticationSuccess(authentication: Authentication): Promise<void> {
    // 这里的目的是屏蔽校验成功后跳转的路径，作为app后端这一步不需要，参考需要自行决定
    // await this.redirectStrategy.send(targetUrl);
  }
}
