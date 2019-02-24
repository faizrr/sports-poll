import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './interfaces/jwt-payload'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(data: AuthDto): Promise<string> {
    const { login, password } = data
    await this.usersService.findOneByLoginAndPassword(login, password)

    return this.jwtService.sign({ login })
  }

  async signUp(data: AuthDto): Promise<string> {
    await this.usersService.create(data)

    return this.jwtService.sign({ login: data.login })
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByLogin(payload.login)
  }
}
