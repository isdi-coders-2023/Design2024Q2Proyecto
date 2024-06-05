import { Given, Then } from '@cucumber/cucumber';
import { UserInMemoryRepository } from './user.inmemory.repository';
import assert from 'node:assert';
import { World } from '../World';

Given('Soy un nuevo usuario', function () {
    return true;
});

Then(
    'El usario con id {int} debe ser persistido en base datos',
    async function (this: World, userId: number) {
        const repository =
            this.app.get<UserInMemoryRepository>('UserRepository');
        const user = await repository.find({ id: userId });
        if (!user) {
            assert.fail(`No se ha encontrado el usuario con id ${userId}`);
        }
        assert.strictEqual(user.id, userId);
    },
);
