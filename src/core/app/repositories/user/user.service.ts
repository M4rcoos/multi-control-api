import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/databases/database.service';
import USER_ROLES from 'src/core/domain/enums/enum-role-user';
import { JwtUserEntity } from 'src/core/domain/entities/jwt-user';
import { UpdateUserParamsDTO } from '../../DTO/auth/update-user-DTO';
import { UserEntity } from 'src/core/domain/entities/user-entity';
import { CreateUserParamsDTO } from '../../DTO/auth/create-user-DTO';

@Injectable()
export default class UserRepository {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async findAll(page: number, limit: number) {
    return await this.prisma.tb_user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        user_type_id: true,
        email: true,
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.prisma.tb_user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.tb_user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  async create({
    email,
    name,
    password,
  }: CreateUserParamsDTO): Promise<JwtUserEntity> {
    const user = await this.prisma.tb_user.create({
      data: {
        email,
        name,
        password,
        blocked: false,
        user_type_id: USER_ROLES.ADMIN,
        created_at: new Date(),
        updated_at: new Date(),
      },
      select: {
        email: true,
        id: true,
        name: true,
        user_type_id: true,
      },
    });

    return {
      ...user,
      role: user.user_type_id,
    };
  }

  async update(id: number, user: UpdateUserParamsDTO): Promise<UserEntity> {
    try {
      const updatedUser = await this.prisma.tb_user.update({
        where: {
          id: id,
        },
        data: {
          ...user,
        },
      });
      return updatedUser;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error(
        `Usuário com ID ${id} não encontrado ou não pode ser atualizado.`,
      );
    }
  }
}
