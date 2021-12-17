import { Injectable } from '@nestjs/common';
import { CreateVerificationRequestDto } from '../dto/create-verification.dto';
import { Verification } from '../verification.entity';
import { VerificationRepository } from '../verification.repo';

@Injectable()
export class VerificationService {
  constructor(private verificationRepo: VerificationRepository) {}

  async create(createDto: CreateVerificationRequestDto): Promise<Verification> {
    return this.verificationRepo.create(createDto);
  }
}
