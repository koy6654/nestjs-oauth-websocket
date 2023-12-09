import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Account } from '../entities/account.entity';
import { EntityRepository } from '@mikro-orm/core';
import { GoogleRequestUser } from './user.type';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: EntityRepository<Account>
    ) {

    }

    async getUserExist(googleInfo: GoogleRequestUser): Promise<boolean> {
        const {email, providerId} = googleInfo;
        const getUserExistWhereOptions = {
            email,
            providerId,
        }

        const userExist = await this.accountRepository.find(getUserExistWhereOptions);

        return userExist.length === 1;
    }
}
