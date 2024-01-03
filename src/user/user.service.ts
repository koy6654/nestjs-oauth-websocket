import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { Account } from '../entities/account.entity';
import { GoogleRequestUser } from './user.type';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: EntityRepository<Account>,
    ) {}

    async getUser(googleInfo: GoogleRequestUser): Promise<Account> {
        const { email, providerId } = googleInfo;
        const getUserExistWhereOptions = {
            email,
            providerId,
        };

        const user = await this.accountRepository.find(
            getUserExistWhereOptions,
        );
        if (user.length !== 1) {
            throw new BadRequestException('invalid_user');
        }

        return user[0];
    }
}
