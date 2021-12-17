import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsFQDN } from 'class-validator';

export enum VerificationStatus {
  Unverified,
  Verified,
}

@ApiTags('verification')
export class CreateVerificationRequestDto {
  @ApiProperty({
    description:
      'The fully qualified domain name which you would like to verify ownership of.',
  })
  @IsNotEmpty()
  @IsFQDN()
  domain: string;
}

@ApiTags('verification')
export class CreateVerificationResponseDto {
  @ApiProperty({
    description: 'The id of the verification request.',
  })
  id: string;

  @ApiProperty({
    description: 'The domain to verify ownership of.',
  })
  domain: string;

  @ApiProperty({
    description: 'The verification code used to verify the domain.',
  })
  code: string;

  @ApiProperty({
    description:
      'The status of the verification request. 0 - Unverified. 1 - Verified.',
  })
  status: VerificationStatus;
}
