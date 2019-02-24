import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UnauthorizedException } from '@nestjs/common'
import { User } from './users.entity'
import { hash, compare } from 'bcrypt'

export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(data: { login: string; password: string }) {
    const user = new User()
    user.login = data.login
    user.passwordHash = await hash(data.password, 10)

    return await this.usersRepository.save(user)
  }

  async findOneByLogin(login: string) {
    const user = await this.usersRepository.findOne({
      login,
    })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }

  async findOneByLoginAndPassword(login: string, password: string) {
    const user = await this.findOneByLogin(login)

    const passwordIsValid = await compare(password, user.passwordHash)
    if (!passwordIsValid) {
      throw new UnauthorizedException()
    }

    return user
  }
}
