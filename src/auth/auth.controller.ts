import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { AuthDto, logInDto } from './dto';
import { JwtGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signin(@Body() dto: logInDto) {
    return this.authService.signIn(dto);
  }

  @UseGuards(JwtGuard)
  @Get('current')
  getme(@GetUser() user: Express.User) {
    return user;
  }
}
