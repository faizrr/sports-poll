import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async create(@Body() user: AuthDto) {
    return this.authService.signUp(user)
  }

  @Post('signIn')
  async signIn(@Body() user: AuthDto) {
    return this.authService.signIn(user)
  }
}
