import { calculateTurnScore, normaliseAccuracyScore, normaliseTimeScore } from './score';

describe('calculateTurnScore', () => {
  it('should correctly calculate minimum score', () => {
    const score = calculateTurnScore(20032, 1);
    expect(score).toEqual(0);
  });

  it('should correctly calculate maximum score', () => {
    const score = calculateTurnScore(0, 5000);
    expect(score).toEqual(100);
  });

  it('should return correct score according to accuracy and time weightings', () => {
    const score = calculateTurnScore(0, 1);
    expect(score).toEqual(80);
  });
});

describe('normaliseAccuracyScore', () => {
  it('should get minimum accuracy score', () => {
    const score = normaliseAccuracyScore(0);
    expect(score).toEqual(0);
  });

  it('should get maximum accuracy score', () => {
    const score = normaliseAccuracyScore(1);
    expect(score).toEqual(100);
  });
});

describe('normaliseTimeScore', () => {
  it('should get minimum time score', () => {
    const score = normaliseTimeScore(0);
    expect(score).toEqual(0);
  });

  it('should get maximum time score', () => {
    const score = normaliseTimeScore(1);
    expect(score).toEqual(100);
  });
});
