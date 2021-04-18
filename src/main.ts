import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { MainModule } from './main.module'

async function bootstrap () {
  const app = await NestFactory.create(MainModule)
  app.enableCors()

  const configService = app.get(ConfigService)
  const port = configService.get('PORT')

  await app.listen(port || 3000)
}
bootstrap()
