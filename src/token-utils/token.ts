import { Autowired, Service } from "@malagu/core";
const tokenExpireTime = 86400; // token过期时间 1 天
const privateKey = "privateKey"; // json-web-token的密钥，不能泄露
import jwt = require("jsonwebtoken");


@Service()
export class TokenUtils {

  async getToken(
    uid: string,
    info: { phone: string; user_name: string; avatar: string }
  ) {
    return jwt.sign(
      {
        phone: info.phone,
        uid,
        user_name: info.user_name,
        avatar: info.avatar,
      },
      privateKey,
      { expiresIn: tokenExpireTime }
    );
  }

  async verifyToken(token: string, phone: string) {
    let decoded: any = {};
    try {
      decoded = jwt.verify(token, privateKey);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new Error('TokenExpired');
      }
      throw new Error('TokenError');
    }

    if (decoded.phone === phone) {
      return {
        uid: decoded.uid,
        token: token,
        phone: phone,
        user_name: decoded.user_name,
        avatar: decoded.avatar,
      };
    }
    throw new Error('TokenNotMatch');
  }

}
