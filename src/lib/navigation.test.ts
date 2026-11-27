import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getRouteMeta } from './navigation.ts';

/**
 * Route metadata drives the app header (eyebrow + title) on every screen.
 * Regressions here show up as wrong or truncated header text, so the cases
 * below lock in the behaviours fixed during the 2026-11 visual audit:
 * a dedicated /learn entry, trailing-slash normalisation, and a real 404
 * fallback instead of the old generic "Learn" label.
 */
describe('getRouteMeta', () => {
  it('gives the practice hub its own brand label instead of the fallback', () => {
    const meta = getRouteMeta('/learn', 'en');
    assert.equal(meta.brandLabel, 'PRACTICE HUB');
    assert.equal(meta.title, 'Learn');
    assert.equal(meta.hideHeader, false);
  });

  it('treats trailing slashes as the same route', () => {
    assert.deepEqual(getRouteMeta('/learn/', 'en'), getRouteMeta('/learn', 'en'));
    assert.deepEqual(getRouteMeta('/games/', 'en'), getRouteMeta('/games', 'en'));
  });

  it('marks unmatched routes as 404 with a short, never-truncating title', () => {
    const meta = getRouteMeta('/definitely-not-a-page', 'en');
    assert.equal(meta.brandLabel, 'ERROR 404');
    assert.equal(meta.title, 'Not Found');
    assert.equal(meta.hideHeader, false);
    assert.equal(meta.hideBottomNav, false);
  });

  it('localises the 404 labels', () => {
    assert.equal(getRouteMeta('/nope', 'ar').title, 'غير موجود');
    assert.equal(getRouteMeta('/nope', 'ku').title, 'Rêç Ne Ye');
  });

  it('keeps real routes matched before the 404 fallback', () => {
    assert.equal(getRouteMeta('/quiz/alphabet', 'en').hideHeader, true);
    assert.equal(getRouteMeta('/vocabulary/numbers', 'en').title, 'Word List');
    assert.equal(getRouteMeta('/', 'en').title, 'Zimanê Kurdî');
  });
});
