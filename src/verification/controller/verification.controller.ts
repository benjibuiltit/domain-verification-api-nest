import { Controller, Post, Body } from '@nestjs/common';
import { VerificationService } from '../service/verification.service';
import {
  CreateVerificationRequestDto,
  CreateVerificationResponseDto,
} from '../dto/create-verification.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('verification')
@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @ApiCreatedResponse({ type: CreateVerificationResponseDto })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  create(
    @Body() createVerificationRequestDto: CreateVerificationRequestDto,
  ): Promise<CreateVerificationResponseDto> {
    return this.verificationService.create(createVerificationRequestDto);
  }
}
