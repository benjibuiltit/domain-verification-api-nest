import * as NodeCache from 'node-cache';
import { Injectable } from '@nestjs/common';
import { Verification } from './verification.entity';

@Injectable()
export class VerificationCache {
  cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  async get(key: string): Promise<Verification> {
    return this.cache.get<Verification>(key);
  }

  async set(key: string, value: any) {
    return this.cache.set<Verification>(key, value);
  }
}
