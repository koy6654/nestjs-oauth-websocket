import { Logger } from '@nestjs/common';
import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(8080, {
    cors: { origin: '*' },
})
export class ChatEventsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    accountId: string;

    constructor(private chatService: ChatService) {
        // TODO: Need to chage redis session or JWT token
        this.accountId = '07a06c49-4a76-55ea-b4dd-7c3c88edfe09';
    }

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger();

    @SubscribeMessage('events')
    async handleEvent(client: Socket, @MessageBody() data: string): Promise<string> {
        // console.log(client);
        await this.chatService.setChatLog(this.accountId, data);
        console.log(data);
        return data;
    }

    // 웹소켓 실행 후 실행됨
    afterInit() {
        this.logger.log('Websocket server init done');
    }

    async handleDisconnect() {
        const result = await this.chatService.deleteChatLog(this.accountId);
        this.logger.log(`Client Disconnected / delete log = ${result}`);
    }

    async handleConnection() {
        const result = await this.chatService.deleteChatLog(this.accountId);
        this.logger.log(`Client Connected / delete log = ${result}`);
    }
}
