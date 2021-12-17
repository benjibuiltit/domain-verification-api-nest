import {
  CreateVerificationResponseDto,
  VerificationStatus,
} from './dto/create-verification.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class DestructedProps {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  domain: string;

  @ApiResponseProperty()
  status: number;
}

export class Verification {
  id: string;
  domain: string;
  status: VerificationStatus;

  constructor(dto: CreateVerificationResponseDto) {
    this.id = dto.id;
    this.domain = dto.domain;
    this.status = dto.status;
  }
}
