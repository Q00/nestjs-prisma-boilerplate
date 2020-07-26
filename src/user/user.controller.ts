import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { ApiException } from '../shared/api-exception.model';
import { LoginInput } from './models/dto/login.input';
import { LoginResponse } from './models/dto/login.response';

@Controller('user')
@ApiTags(User.modelName)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  // @Post('register')
  // @ApiCreatedResponse({ type: User })
  // @ApiBadRequestResponse({ type: ApiException })
  // @ApiOperation(GetOperationId(User.modelName, 'Register'))
  // async register(@Body() vm: RegisterVm): Promise<User> {}

  @Post('login')
  @ApiCreatedResponse({ type: LoginResponse })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(User.modelName, 'Login'))
  async login(@Body() payload: LoginInput): Promise<LoginResponse> {
    const fields = Object.keys(payload);
    fields.forEach((field) => {
      if (!payload[field]) {
        throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
      }
    });

    return this._userService.login(payload);
  }
}
