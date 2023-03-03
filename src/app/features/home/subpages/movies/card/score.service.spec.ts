import { ScoreService } from './score.service';

describe('ScoreService', () => {
  let service: ScoreService;

  beforeEach(() => {
    service = new ScoreService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add score to the score array', () => {
    service.addScore({ id: 1, score: 5 });
    expect((service as any).score$$.value.length).toBe(1);
    expect((service as any).score$$.value[0].id).toBe(1);
    expect((service as any).score$$.value[0].score).toBe(5);
  });

  it('should remove score from the score array', () => {
    service.addScore({ id: 1, score: 5 });
    service.addScore({ id: 2, score: 7 });
    service.removeScore(1);
    expect((service as any).score$$.value.length).toBe(1);
    expect((service as any).score$$.value[0].id).toBe(2);
    expect((service as any).score$$.value[0].score).toBe(7);
  });

  it('should check if score exists in the score array', () => {
    service.addScore({ id: 1, score: 5 });
    expect(service.hasScore(1)).toBe(true);
    expect(service.hasScore(2)).toBe(false);
  });
});