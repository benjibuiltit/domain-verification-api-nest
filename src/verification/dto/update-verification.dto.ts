import { PartialType } from '@nestjs/mapped-types';
import { CreateVerificationRequestDto } from './create-verification.dto';

export class UpdateVerificationDto extends PartialType(
  CreateVerificationRequestDto,
) {}
