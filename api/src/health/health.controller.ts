import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
//import { Public } from '../common/decorators/public.decorator'

@ApiTags('Health')
@Controller('health')
export class HealthController {
	constructor() {

	}

	//@Public()
	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Check application health' })
	check() {
		return {
			status: 'healthy'
		}
	}
}
