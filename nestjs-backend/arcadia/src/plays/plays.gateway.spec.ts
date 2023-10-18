import { Test, TestingModule } from '@nestjs/testing';
import { PlaysGateway } from './plays.gateway';
import { PlaysService } from './plays.service';

describe('PlaysGateway', () => {
  let gateway: PlaysGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaysGateway, PlaysService],
    }).compile();

    gateway = module.get<PlaysGateway>(PlaysGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
