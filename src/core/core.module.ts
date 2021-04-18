import { TransformInterceptor } from './transform/transform.interceptor'
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports: [CacheModule.register()],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ]
})
export class CoreModule {}
