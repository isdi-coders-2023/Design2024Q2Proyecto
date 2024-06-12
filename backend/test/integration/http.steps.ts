import { Then, When } from '@cucumber/cucumber';
import { World } from './World';
import request from 'supertest';
import assert from 'node:assert';

When(
    'Hago una peticion POST al endpoint {string} con el cuerpo:',
    async function (this: World, url: string, body: string) {
        this.request = request(this.app?.getHttpServer()).post(url);
        const data: object = JSON.parse(body);
        this.request = this.request.set('Content-Type', 'application/json');
        this.response = await this.request.send(data);
    },
);

Then(
    'Debo ser respuesto con un statusCode {int}',
    function (this: World, statusCode: number) {
        const response = this.response;
        assert.strictEqual(response?.statusCode, statusCode);
    },
);
