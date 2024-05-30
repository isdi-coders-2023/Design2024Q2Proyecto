import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';

function isItFriday(today) {
    if (today === 'Friday') {
        return 'TGIF';
    } else {
        return 'Nope';
    }
}

Given('today is {string}', function (givenDay) {
    this.today = givenDay;
});

When("I ask whether it's Friday yet", function () {
    this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (this, expectedAnswer) {
    console.log(this.actualAnswer);
    console.log(expectedAnswer);
    assert.strictEqual(this.actualAnswer, expectedAnswer);
});
