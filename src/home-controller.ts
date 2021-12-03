import { Controller, Get, Text } from '@malagu/mvc/lib/node';
import { Anonymous } from '@malagu/security/lib/node';

@Controller()
export class HomeController {
    
    @Anonymous()
    @Get()
    @Text()
    home(): string {
        return 'Welcome to Malagu';
    }
}
