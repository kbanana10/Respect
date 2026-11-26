import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getTapPopNotes,
  getSoftClickNotes,
  getSuccessChimeNotes,
  getGentleRetryNotes,
  getRewardSparkleNotes,
  getVictoryFanfareNotes,
  shouldEnableQuizHearts,
} from './soundPresets';

test('getTapPopNotes ascends across the C-major pentatonic scale and wraps safely', () => {
  const step0 = getTapPopNotes(0)[0];
  const step1 = getTapPopNotes(1)[0];
  const step2 = getTapPopNotes(2)[0];
  const step8 = getTapPopNotes(8)[0];
  const negative = getTapPopNotes(-3)[0];

  assert.ok(step1.freq > step0.freq, 'step 1 should be higher pitch than step 0');
  assert.ok(step2.freq > step1.freq, 'step 2 should be higher pitch than step 1');
  assert.equal(step8.freq, step0.freq, 'step 8 wraps back to start of pentatonic scale');
  assert.equal(negative.freq, step0.freq, 'negative step clamps to 0');
});

test('getSuccessChimeNotes escalates pitch with combo and adds 4th sparkle note at 3+ streak', () => {
  const combo1 = getSuccessChimeNotes(1);
  const combo2 = getSuccessChimeNotes(2);
  const combo3 = getSuccessChimeNotes(3);
  const combo99 = getSuccessChimeNotes(99);
  const combo6 = getSuccessChimeNotes(6);

  assert.equal(combo1.length, 3);
  assert.equal(combo3.length, 4, '3+ combo adds high sparkle bell');
  assert.ok(combo2[0].freq > combo1[0].freq, 'combo 2 shifts higher than combo 1');
  assert.equal(combo99[0].freq, combo6[0].freq, 'pitch clamps at combo 6 to stay non-piercing');
});

test('getGentleRetryNotes stays warm and lowpass-filtered below 700Hz', () => {
  const notes = getGentleRetryNotes();
  assert.equal(notes.length, 2);
  for (const note of notes) {
    assert.ok((note.lowpassHz ?? 9999) <= 700, 'retry tones stay warm and muted');
    assert.ok(note.volume <= 0.15, 'retry tones stay gentle in volume');
  }
});

test('reward, click, and victory fanfare presets produce valid bounded note schedules', () => {
  const groups = [getSoftClickNotes(), getRewardSparkleNotes(), getVictoryFanfareNotes()];
  for (const notes of groups) {
    assert.ok(notes.length >= 1);
    for (const n of notes) {
      assert.ok(n.freq > 100 && n.freq < 4000);
      assert.ok(n.duration > 0 && n.duration <= 1);
      assert.ok(n.volume > 0 && n.volume <= 0.25);
    }
  }
});

test('shouldEnableQuizHearts disables punishing hearts in Kids Mode and review modes', () => {
  assert.equal(shouldEnableQuizHearts('u0_hawar_sounds', 'kids'), false);
  assert.equal(shouldEnableQuizHearts('u0_hawar_sounds', 'adults'), true);
  assert.equal(shouldEnableQuizHearts('srs_review', 'adults'), false);
  assert.equal(shouldEnableQuizHearts('review_mistakes', 'adults'), false);
  assert.equal(shouldEnableQuizHearts('all', 'kids'), false);
  assert.equal(shouldEnableQuizHearts('all', 'adults'), true);
});
