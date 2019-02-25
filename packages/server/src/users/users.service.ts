import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UnauthorizedException, ConflictException } from '@nestjs/common'
import { User } from './users.entity'
import { hash, compare } from 'bcrypt'

export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(data: { login: string; password: string }) {
    const user = await this.usersRepository.findOne({
      login: data.login,
    })
    if (user) {
      throw new ConflictException()
    }

    const newUser = new User()
    newUser.login = data.login
    newUser.passwordHash = await hash(data.password, 10)

    return await this.usersRepository.save(newUser)
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
