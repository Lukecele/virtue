import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  reflectPerspective,
  detectNonEnglishLanguage,
  containsProfanity,
  REFLECTIONS
} from '../lib/nlp-engine.ts';

describe('Virtue NLP - Grammatical Reflection', () => {
  it('reflects first-person pronouns to second-person', () => {
    assert.equal(reflectPerspective('I sold my tokens'), 'you sold your tokens');
    assert.equal(reflectPerspective('I was liquidated'), 'you were liquidated');
  });

  it('strips leading conjunctions and trailing punctuation', () => {
    assert.equal(reflectPerspective('because I panicked!'), 'you panicked');
    assert.equal(reflectPerspective('that I bought the top?'), 'you bought the top');
  });

  it('falls back safely for empty or invalid input', () => {
    assert.equal(reflectPerspective(''), 'that trade');
    assert.equal(reflectPerspective(null), 'that trade');
  });
});

describe('Virtue NLP - Multilingual Routing Detection', () => {
  it('detects CJK and non-Latin unicode blocks', () => {
    assert.equal(detectNonEnglishLanguage('你好').isNonEnglish, true);
    assert.equal(detectNonEnglishLanguage('こんにちは').isNonEnglish, true);
    assert.equal(detectNonEnglishLanguage('Привет').isNonEnglish, true);
  });

  it('detects European non-English vocabulary', () => {
    assert.equal(detectNonEnglishLanguage('Ho venduto in panico').isNonEnglish, true);
    assert.equal(detectNonEnglishLanguage('He vendido mis monedas').isNonEnglish, true);
  });

  it('approves standard English confessions', () => {
    assert.equal(detectNonEnglishLanguage('I panic sold at the local bottom').isNonEnglish, false);
  });
});

describe('Virtue NLP - Civility & Profanity Filter', () => {
  it('flags aggressive profanity tokens', () => {
    assert.equal(containsProfanity('What the fuck is this coin'), true);
    assert.equal(containsProfanity('piece of shit market'), true);
  });

  it('approves regular trading jargon and clean discourse', () => {
    assert.equal(containsProfanity('I got liquidated on 50x leverage'), false);
    assert.equal(containsProfanity('Is the liquidity pool locked?'), false);
  });
});
