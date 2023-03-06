import { TestBed } from '@angular/core/testing';
import { Film } from 'src/app/model/film.model';
import { MywatchlistService } from './mywatchlist.service';

describe('MywatchlistService', () => {
  let service: MywatchlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MywatchlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a movie to the favorite list', (done) => {
    const movie: Film = {
      id: 1,
      img: 'test.jpg',
      title: 'Test Movie',
      genre: 'Test Genre',
      length: '120 min',
      ageRest: 'PG-13',
      description: 'A test movie description.',
      score: '8.5',
      director: 'Test Director',
      actors: ['Actor 1', 'Actor 2'],
      boxOff: 1000000,
      premier: true,
    };
    service.addMovie(movie);
    service.favList$.subscribe((favList) => {
      expect(favList).toContain(movie);
      done();
    });
  });

  it('should remove a movie from the favorite list', (done: DoneFn) => {
    const movie1: Film = {
      id: 1,
      img: 'test1.jpg',
      title: 'Test Movie 1',
      genre: 'Test Genre',
      length: '120 min',
      ageRest: 'PG-13',
      description: 'A test movie description.',
      score: '8.5',
      director: 'Test Director',
      actors: ['Actor 1', 'Actor 2'],
      boxOff: 1000000,
      premier: true,
    };
    const movie2: Film = {
      id: 2,
      img: 'test2.jpg',
      title: 'Test Movie 2',
      genre: 'Test Genre',
      length: '120 min',
      ageRest: 'PG-13',
      description: 'A test movie description.',
      score: '8.5',
      director: 'Test Director',
      actors: ['Actor 1', 'Actor 2'],
      boxOff: 1000000,
      premier: true,
    };
    service.addMovie(movie1);
    service.addMovie(movie2);
    service.removeMovie(movie1.id);
    service.favList$.subscribe((favList) => {
      expect(favList).not.toContain(movie1);
      expect(favList).toContain(movie2);
      done();
    });
  });

  it('should check if a movie is in the favorite list', (done: DoneFn) => {
    const movie1: Film = {
      id: 1,
      img: 'test1.jpg',
      title: 'Test Movie 1',
      genre: 'Test Genre',
      length: '120 min',
      ageRest: 'PG-13',
      description: 'A test movie description.',
      score: '8.5',
      director: 'Test Director',
      actors: ['Actor 1', 'Actor 2'],
      boxOff: 1000000,
      premier: true,
    };
    const movie2: Film = {
      id: 2,
      img: 'test2.jpg',
      title: 'Test Movie 2',
      genre: 'Test Genre',
      length: '120 min',
      ageRest: 'PG-13',
      description: 'A test movie description.',
      score: '8.5',
      director: 'Test Director',
      actors: ['Actor 1', 'Actor 2'],
      boxOff: 1000000,
      premier: true,
    };

    service.addMovie(movie1);
    const hasMovie1 = service.hasMovie(movie1.id);
    const hasMovie2 = service.hasMovie(movie2.id);

    expect(hasMovie1).toBeTrue();
    expect(hasMovie2).toBeFalse();
    service.favList$.subscribe((favList) => {
      expect(favList).toContain(movie1);
      expect(favList).not.toContain(movie2);
      done();
    });
  });
});
