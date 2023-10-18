import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { PlaysService } from './plays.service';
import { CreatePlayDto } from './dto/create-play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';

@WebSocketGateway()
export class PlaysGateway {
  constructor(private readonly playsService: PlaysService) {}

  @SubscribeMessage('createPlay')
  create(@MessageBody() createPlayDto: CreatePlayDto) {
    return this.playsService.create(createPlayDto);
  }

  @SubscribeMessage('findAllPlays')
  findAll() {
    return this.playsService.findAll();
  }

  @SubscribeMessage('findOnePlay')
  findOne(@MessageBody() id: number) {
    return this.playsService.findOne(id);
  }

  @SubscribeMessage('updatePlay')
  update(@MessageBody() updatePlayDto: UpdatePlayDto) {
    return this.playsService.update(updatePlayDto.id, updatePlayDto);
  }

  @SubscribeMessage('removePlay')
  remove(@MessageBody() id: number) {
    return this.playsService.delete(id);
  }
}
