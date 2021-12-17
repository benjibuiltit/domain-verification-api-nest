import { Controller, Param, Post, Body, Get } from '@nestjs/common';
import { VerificationService } from '../service/verification.service';
import {
  CreateVerificationRequestDto,
  CreateVerificationResponseDto,
} from '../dto/create-verification.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Verification } from '../verification.entity';
import { FindOneParams } from '../dto/get-verification.dto';
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

  @ApiCreatedResponse({ type: CreateVerificationResponseDto })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @Get(':id')
  findById(@Param() params: FindOneParams): Promise<Verification> {
    return this.verificationService.findById(params.id);
  }
}
