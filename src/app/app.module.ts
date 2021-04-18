import { Module } from '@nestjs/common'
import { PostsModule } from './posts/posts.module'
import { SponsorsModule } from './sponsors/sponsors.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [PostsModule, SponsorsModule, UsersModule],
  exports: [UsersModule]
})
export class AppModule {}
