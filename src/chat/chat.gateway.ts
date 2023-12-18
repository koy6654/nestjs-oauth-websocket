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
    constructor(private chatService: ChatService) {}
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger();

    @SubscribeMessage('events')
    handleEvent(client: Socket, @MessageBody() data: string): string {
        // console.log(client);
        console.log(data);
        return data;
    }

    // 웹소켓 실행 후 실행됨
    afterInit(server: Server) {
        this.logger.log('Websocket server init done');
    }

    handleDisconnect(client: Socket) {
        // TODO: Need to chage redis session or JWT token
        const accountId = '07a06c49-4a76-55ea-b4dd-7c3c88edfe09';
        const result = this.chatService.deleteChatLog(accountId);
        this.logger.log(`Client Disconnected : ${client.id} delete log = ${result}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client Connected : ${client.id}`);
    }
}
