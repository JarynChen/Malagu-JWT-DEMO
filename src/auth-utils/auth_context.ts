import { SecurityContext } from "@malagu/security/lib/node";
import { TokenAuthentication } from "./auth_protocol";

export interface CustomSecurityContext extends SecurityContext {
  authentication: TokenAuthentication;
}
