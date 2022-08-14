import {
  Controller,
  Get
} from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  create(): any {
    return this.seedService.create();
  }
}
