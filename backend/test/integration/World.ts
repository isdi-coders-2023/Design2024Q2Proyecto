import { INestApplication } from '@nestjs/common';
import { Test, Response } from 'supertest';

export interface World {
    app: INestApplication;
    request?: Test;
    response?: Response;
}
