import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dtos/user.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Res() response, @Body() user: UserDTO) {
    const newUser = await this.usersService.createUser(user);
    return response.status(HttpStatus.CREATED).json(newUser);
  }
}
