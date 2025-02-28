import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import USER_ROLES from 'src/core/domain/enums/enum-role-user';
import { ok } from 'src/core/domain/http/api-response';
import { Public } from '../../decorators/public.decorator';

import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UpdateUserParamsDTO } from 'src/core/app/DTO/auth/update-user-DTO';
import { FindAllUserParamsDTO } from 'src/core/app/DTO/user/find-all-user-DTO';
import { FindByIdUserParamsDTO } from 'src/core/app/DTO/user/find-by-id-user-DTO';
import { Roles } from '../../decorators/roles.decorator';
import { CreateUserParamsDTO } from 'src/core/app/DTO/user/create-user-DTO';
import { UserFindAllUseCase } from 'src/core/app/usecases/user/user-find-all-use-case.service';
import { UserFindByIdUseCase } from 'src/core/app/usecases/user/user-find-by-id-use-case.service';
import { UserUpdateUseCase } from 'src/core/app/usecases/user/user-update-use-case.service';
import { UserCreateUseCase } from 'src/core/app/usecases/user/user-create-use-case.service';

@Controller('users')
export class UserController {
  @Inject(UserFindAllUseCase)
  private readonly findAllUseCase: UserFindAllUseCase;

  @Inject(UserFindByIdUseCase)
  private readonly findByIdUseCase: UserFindByIdUseCase;

  @Inject(UserUpdateUseCase)
  private readonly updateUseCase: UserUpdateUseCase;

  @Inject(UserCreateUseCase)
  private readonly createUseCase: UserCreateUseCase;

  @Roles(USER_ROLES.ADMIN)
  @HttpCode(200)
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'page',
    type: Number,
    description: 'Página a ser acessada',
    required: false,
  })
  @ApiParam({
    name: 'limit',
    type: Number,
    description: 'Número de itens em cada página',
    required: false,
  })
  @Get('/')
  async findAll(
    @Query('page') page: FindAllUserParamsDTO['page'],
    @Query('limit') limit: FindAllUserParamsDTO['limit'],
  ) {
    const response = await this.findAllUseCase.execute({ page, limit });
    return ok({ payload: response });
  }

  @Roles(USER_ROLES.ADMIN)
  @HttpCode(200)
  @ApiBearerAuth('access-token')
  @Get(':id')
  async findById(@Param('id') id: FindByIdUserParamsDTO['id']) {
    const response = await this.findByIdUseCase.execute(Number(id));
    return ok({ payload: response });
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do usuário a ser atualizado',
    required: true,
  })
  async update(
    @Param('id') id: number,
    @Body()
    user: UpdateUserParamsDTO,
  ) {
    const response = await this.updateUseCase.execute(Number(id), user);
    return ok({ payload: response });
  }

  @Public()
  @Post()
  @HttpCode(200)
  async create(@Body() user: CreateUserParamsDTO) {
    const response = await this.createUseCase.execute(user);
    return await ok({ payload: response });
  }
}
