import { CreateVerificationRequestDto } from './dto/create-verification.dto';
import { Verification } from './verification.entity';
import {
  Verification as VerificationSchemaDefinition,
  VerificationDocument,
} from './verification.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerificationRepository {
  constructor(
    @InjectModel(VerificationSchemaDefinition.name)
    private verificationModel: Model<VerificationDocument>,
  ) {}

  async create(createDto: CreateVerificationRequestDto): Promise<Verification> {
    const dbResult = await this.verificationModel.create({
      ...createDto,
      status: 0,
      _id: randomUUID(),
    });

    const verification = new Verification({
      id: dbResult._id,
      domain: dbResult.domain,
      status: dbResult.status,
    });

    return verification;
  }
}
