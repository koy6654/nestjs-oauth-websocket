import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class ChatLog {
    @PrimaryKey({ columnType: 'uuid' })
    id = uuidv4();

    @Property({ fieldName: 'account_id', columnType: 'uuid' })
    accountId: string;

    @Property({ fieldName: 'value', columnType: 'text' })
    value: string;

    @Property({ fieldName: 'create_time', columnType: 'timestamptz' })
    createTime: string;
}
