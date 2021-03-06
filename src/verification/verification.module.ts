import { Module } from '@nestjs/common';
import { VerificationService } from './service/verification.service';
import { VerificationController } from './controller/verification.controller';
import {
  Verification as VerificationSchemaDefinition,
  VerificationSchema,
} from './verification.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { VerificationRepository } from './verification.repo';
import { VerificationCache } from './verification.cache';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VerificationSchemaDefinition.name, schema: VerificationSchema },
    ]),
  ],
  controllers: [VerificationController],
  providers: [VerificationService, VerificationRepository, VerificationCache],
})
export class VerificationModule {}
