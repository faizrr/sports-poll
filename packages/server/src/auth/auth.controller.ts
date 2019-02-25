import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async create(@Body() user: AuthDto) {
    const token = await this.authService.signUp(user)
    return { token }
  }

  @Post('signIn')
  async signIn(@Body() user: AuthDto) {
    const token = await this.authService.signIn(user)
    return { token }
  }
}
