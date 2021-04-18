import { CacheTTL, Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @CacheTTL(null)
  findAll() {
    return this.postsService.findAll();
  }
}
