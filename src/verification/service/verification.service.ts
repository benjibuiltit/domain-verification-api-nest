import { Injectable, Logger } from '@nestjs/common';
import {
  CreateVerificationRequestDto,
  VerificationStatus,
} from '../dto/create-verification.dto';
import { Verification } from '../verification.entity';
import { VerificationRepository } from '../verification.repo';
import { resolveTxt as resolveTxtSync } from 'dns';
import { promisify } from 'util';
const resolveTxt = promisify(resolveTxtSync);

@Injectable()
export class VerificationService {
  constructor(private verificationRepo: VerificationRepository) {}

  async create(createDto: CreateVerificationRequestDto): Promise<Verification> {
    return this.verificationRepo.create(createDto);
  }

  async findById(id: string): Promise<Verification> {
    const verification = await this.verificationRepo.findById(id);
    await this.verifyOwnership(verification);
    return verification;
  }

  async verifyOwnership(verification: Verification): Promise<Verification> {
    const txtRecordLists = await resolveTxt(verification.domain);
    for (const txtRecordList of txtRecordLists) {
      for (const txtRecord of txtRecordList) {
        if (txtRecord === verification.code) {
          verification.status = VerificationStatus.Verified;
          return this.verificationRepo.update(verification.id, verification);
        }
      }
    }

    return verification;
  }
}
