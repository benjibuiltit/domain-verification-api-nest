import {
  CreateVerificationResponseDto,
  VerificationStatus,
} from './dto/create-verification.dto';
export class Verification {
  id: string;
  domain: string;
  code: string;
  status: VerificationStatus;

  constructor(dto: CreateVerificationResponseDto) {
    this.id = dto.id;
    this.domain = dto.domain;
    this.code = dto.code;
    this.status = dto.status;
  }
}
