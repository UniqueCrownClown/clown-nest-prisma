import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { AuthDto, logInDto } from './dto';
import { JwtGuard } from './guard';

@Controller('auth')
@ApiTags('auth')
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
  @ApiBearerAuth('defaultBearerAuth')
  @Get('current')
  getme(@GetUser() user: ExpressUser) {
    return user;
  }
}
