import { Service } from "@malagu/core";
import { Context, AttributeScope } from "@malagu/web/lib/node";
import { CustomSecurityContext } from "./auth_context";

@Service()
export class UserInfoUtils {
  uid: string;
  phone: string;
  user_name: string;
  avatar: string;

  get_info() {
    let authenticationInfo = Context.getAttr<CustomSecurityContext>(
      "CurrentSecurityContextRequest",
      AttributeScope.Request
    ).authentication;
    this.uid = authenticationInfo.uid;
    this.phone = authenticationInfo.phone;
    this.user_name = authenticationInfo.user_name;
    this.avatar = authenticationInfo.avatar;
    return this;
  }
}
