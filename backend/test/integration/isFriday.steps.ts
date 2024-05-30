import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert';

function isItFriday(today: string) {
    if (today === 'Friday') {
        return 'TGIF';
    } else {
        return 'Nope';
    }
}

Given('today is {string}', function (givenDay: string) {
    this.today = givenDay;
});

When("I ask whether it's Friday yet", function () {
    this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer: string) {
    assert.strictEqual(this.actualAnswer, expectedAnswer);
});
