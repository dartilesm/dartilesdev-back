import { Test, TestingModule } from '@nestjs/testing'
import { SponsorsController } from './sponsors.controller'
import { SponsorsService } from './sponsors.service'

describe('SponsorsController', () => {
  let controller: SponsorsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SponsorsController],
      providers: [SponsorsService]
    }).compile()

    controller = module.get<SponsorsController>(SponsorsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
