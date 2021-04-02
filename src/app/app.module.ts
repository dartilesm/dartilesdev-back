import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { SponsorsModule } from './sponsors/sponsors.module';

const appModules = [PostsModule, SponsorsModule]

@Module({
  imports: [...appModules],
  exports: [...appModules],
})
export class AppModule {}
