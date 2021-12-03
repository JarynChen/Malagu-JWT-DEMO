## Malagu使用JWT案例

### 核心Package
- `@malagu/security`: 提供统一认证服务
- [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken): 签发和校验token

### 使用说明

我们在 UserController 定义的获取 Token 和 Token 验证成功后，获取Token中信息的两个方法，下面分别说明

- 获取 Token

如下图所示，在get方法中，我们调用了生成 Token 的方法 getToken，传入的参数，可以在 `src/token-utils/token.ts` 中自定义，需要注意的是，该方法需要添加 `@Anonymous()` 装饰器，告诉框架该方法可以匿名访问

![image-20211203162447804](https://img.jaryn.ink/img/202112031624841.png)

我们使用 Postman 测试该接口，可以发现能够成功返回 Token

![image-20211203165323458](https://img.jaryn.ink/img/202112031653528.png)

- 验证 Token

如下图所示，该方法添加了 `@Authenticated()` 装饰器，告诉框架该方法需要先调用鉴权，只有在鉴权成功后才能访问。

我们可以封装一个获取 Token 中参数的方法，用于在业务代码中获取参数，参考 `src/auth-utils/auth_info.ts` 

在下图所示方法中，如果鉴权成功，会返回用户的 user_name 信息

![image-20211203162835391](https://img.jaryn.ink/img/202112031628433.png)

由于我设置的该方法的鉴权条件为 Header 中需要传入 Token 和 Phone 参数，所以调用方法如下图

![image-20211203165220408](https://img.jaryn.ink/img/202112031652479.png)

###  @malagu/security 组件相关说明

目录结构:

```
auth-utils
│   ├── auth_context.ts
│   ├── auth_info.ts #封装获取Token中参数的方法
│   ├── auth_protocol.ts
│   ├── auth_provider.ts #鉴权Provider代码
│   ├── auth_success_handler.ts
│   └── index.ts
```



鉴权验证:

我们需重点关注 `auth_provider` 中的代码，下面我们简单说明其中的逻辑

```
export interface AuthenticationProvider {
    readonly priority: number;
    authenticate(): Promise<Authentication | undefined>;
    support(): Promise<boolean>;
}
```

我们可以自定义实现多个AuthenticationProvider，并以此为ID注入，那么后续框架会自动加载该自定义实现，并鉴权。

在 AuthenticationProvider 接口中，support 方法用来判断是否满足当前方法的鉴权条件，如果返回值为 `true` , 则会调用当前实现中的 `authenticate` 方法。

在 `authenticate` 方法中，我们可以自定义实现鉴权的逻辑。如果鉴权通过，则我们返回值中的 `authenticated` 和 `next` 设置为true即可，如果鉴权不通过，只需把 `authenticated` 设置为 false 即可。

我们可以自定义 `authenticate` 方法的返回值，参考 `src/auth-utils/auth_protocol.ts` , 自定义的返回值可以在后续业务代码中获取。



---

欢迎大家指出文档或代码中的不足，谢谢

