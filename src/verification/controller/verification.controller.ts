import {
  Controller,
  Param,
  Post,
  Body,
  Get,
  ParseUUIDPipe,
} from '@nestjs/common';
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
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Verification } from '../verification.entity';
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

  @ApiOkResponse({ type: CreateVerificationResponseDto })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @Get(':id')
  findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Verification> {
    return this.verificationService.findById(id);
  }
}
