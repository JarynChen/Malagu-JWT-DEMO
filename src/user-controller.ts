import { Autowired } from '@malagu/core';
import { Controller, Get, Param, Delete, Put, Post, Body, Query } from '@malagu/mvc/lib/node';
import { Anonymous, Authenticated } from '@malagu/security/lib/node';
import { UserInfoUtils } from './auth-utils';
import { TokenUtils } from './token-utils/token';

export interface User {
    uid: string;
    phone: string;
    user_name: string;
    avatar: string
}

const users = [{ user_name: 'Tom', avatar: 'https://xxxx.com', uid: '1234', phone: '13000000000' }]

@Controller('user')
export class UserController {
    @Autowired()
    private readonly token: TokenUtils;
    @Autowired()
    private readonly userInfo: UserInfoUtils;

    @Anonymous()
    @Get()
    async get(@Query('user_name') user_name: string): Promise<string | undefined> {
        for (const user of users) {
            if (user.user_name === user_name) {
                return await this.token.getToken(user.uid, { phone: user.phone, user_name: user.user_name, avatar: user.avatar });
            }
        }
    }

    @Authenticated()
    @Post()
    verify(): string | undefined {
        return this.userInfo.get_info().user_name;
    }

}
