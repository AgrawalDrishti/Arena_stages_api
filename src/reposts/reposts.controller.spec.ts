import { Test, TestingModule } from '@nestjs/testing';
import { RepostsController } from './reposts.controller';

describe('RepostsController', () => {
  let controller: RepostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepostsController],
    }).compile();

    controller = module.get<RepostsController>(RepostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
