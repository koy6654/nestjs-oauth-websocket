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

@WebSocketGateway(8080, {
    cors: { origin: '*' },
})
export class ChatEventsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger();

    @SubscribeMessage('events')
    handleEvent(client: Socket, @MessageBody() data: string): string {
        console.log(data);
        return data;
    }

    // 웹소켓 실행 후 실행됨
    afterInit(server: Server) {
        this.logger.log('Websocket server init done');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client Disconnected : ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client Connected : ${client.id}`);
    }
}
