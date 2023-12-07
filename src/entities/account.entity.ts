import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Account {
    @PrimaryKey({ columnType: 'uuid' })
    id = uuidv4();

    @Property({ fieldName: 'email', columnType: 'text' })
    email: string;

    @Property({ fieldName: 'password', columnType: 'text' })
    password: string;
}
