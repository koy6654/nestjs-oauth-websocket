import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { Account } from '../entities/account.entity';
import { GoogleRequestUser } from './user.type';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: EntityRepository<Account>,

        @Inject()
        private readonly authService: AuthService,
    ) {}

    async getUser(googleInfo: GoogleRequestUser): Promise<Account> {
        const {email, providerId} = googleInfo;
        const getUserExistWhereOptions = {
            email,
            providerId,
        }

        const user = await this.accountRepository.find(getUserExistWhereOptions);
        if (user.length !== 1) {
            throw new Error('569be1f4-bd81-5def-9b23-dec5413c5b11');
        }
        
        return user[0];
    }
}
