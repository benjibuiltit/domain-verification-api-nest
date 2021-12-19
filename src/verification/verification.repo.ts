import { CreateVerificationRequestDto } from './dto/create-verification.dto';
import { Verification } from './verification.entity';
import {
  Verification as VerificationSchemaDefinition,
  VerificationDocument,
} from './verification.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { VerificationCache } from './verification.cache';

@Injectable()
export class VerificationRepository {
  constructor(
    @InjectModel(VerificationSchemaDefinition.name)
    private verificationModel: Model<VerificationDocument>,
    private verificationCache: VerificationCache,
  ) {}

  async create(createDto: CreateVerificationRequestDto): Promise<Verification> {
    const dbResult = await this.verificationModel.create({
      ...createDto,
      status: 0,
      _id: randomUUID(),
      code: randomUUID(),
    });

    const verification = new Verification({
      id: dbResult._id,
      domain: dbResult.domain,
      code: dbResult.code,
      status: dbResult.status,
    });

    this.verificationCache.set(verification.id, verification);

    return verification;
  }

  async findById(id: string): Promise<Verification> {
    const cacheResult = await this.verificationCache.get(id);
    if (cacheResult) return cacheResult;

    const dbResult = await this.verificationModel.findById(id);
    if (!dbResult) throw new NotFoundException();

    const verification = new Verification({
      id: dbResult._id,
      domain: dbResult.domain,
      code: dbResult.code,
      status: dbResult.status,
    });

    return verification;
  }

  async update(
    id: string,
    updateDto: UpdateVerificationDto,
  ): Promise<Verification> {
    const dbResult = await this.verificationModel.findOneAndUpdate(
      {
        id,
      },
      updateDto,
    );

    const verification = new Verification({
      id: dbResult._id,
      domain: dbResult.domain,
      code: dbResult.code,
      status: dbResult.status,
    });

    await this.verificationCache.set(verification.id, verification);

    return verification;
  }
}
