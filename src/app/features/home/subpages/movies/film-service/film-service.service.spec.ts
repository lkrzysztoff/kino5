import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Film } from 'src/app/shared/interfaces/film.interface';
import { Show } from 'src/app/shared/interfaces/show.interface';
import { Screen } from 'src/app/shared/interfaces/screen.interface';
import { FilmService } from './film-service';
import { movie } from 'src/app/features/admin/pages/add-movies-admin/movie.interface';
import { Showtest } from '../../reservation/reservation-grid/reservation-interfaces';


describe('FilmService', () => {
  let dataSource: FilmService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilmService],
    });
    dataSource = TestBed.inject(FilmService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve films from the API via GET', () => {
    const mockFilms: Film[] = [
      {
        id: 1,
        img: 'https://example.com/image1.jpg',
        title: 'Film 1',
        genre: 'Action',
        length: '120 min',
        ageRest: 'PG-13',
        description: 'A great action film',
        score: '7.5',
        director: 'Director 1',
        actors: ['Actor 1', 'Actor 2'],
        boxOff: 1000000,
        premier: true,
      },
      {
        id: 2,
        img: 'https://example.com/image2.jpg',
        title: 'Film 2',
        genre: 'Comedy',
        length: '90 min',
        ageRest: 'R',
        description: 'A hilarious comedy',
        score: '8.0',
        director: 'Director 2',
        actors: ['Actor 3', 'Actor 4'],
        boxOff: 2000000,
        premier: false,
      },
    ];

    dataSource.getFilms().subscribe((films) => {
      expect(films).toEqual(mockFilms);
    });

    const req = httpMock.expectOne(`${dataSource.baseUrl}films`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFilms);
  });

  it('should retrieve shows from the API via GET', () => {
    const mockShows: Showtest[] = [
      {
        id: 1,
        hour: '12:30',
        screen: 2,
        reservedSeats: ['A3', 'C4', 'H5'],
        priceList: [
          { type: 'normal', price: 15 },
          { type: 'reduced', price: 10 },
          { type: 'student', price: 8 },
        ],
        filmId: 1,
      },
      {
        id: 2,
        hour: '16:00',
        screen: 2,
        reservedSeats: ['D1', 'E2', 'F3'],
        priceList: [
          { type: 'normal', price: 20 },
          { type: 'reduced', price: 15 },
          { type: 'student', price: 10 },
        ],
        filmId: 2,
      },
    ];

    dataSource.getShowtest().subscribe((shows) => {
      expect(shows).toEqual(mockShows);
    });

    const req = httpMock.expectOne(`${dataSource.baseUrl}show`);
    expect(req.request.method).toBe('GET');
    req.flush(mockShows);
  });
  it('should retrieve screens from the API via GET', () => {
    const mockScreens: Screen[] = [
      {
        id: 1,
        name: 'Screen 1',
        rows: 10,
        colu: 15,
      },
      {
        id: 2,
        name: 'Screen 2',
        rows: 12,
        colu: 18,
      },
    ];

    dataSource.getScreens().subscribe((screens) => {
      expect(screens).toEqual(mockScreens);
    });

    const req = httpMock.expectOne(`${dataSource.baseUrl}screen`);
    expect(req.request.method).toBe('GET');
    req.flush(mockScreens);
  });

  it('should add a movie to the API via POST', () => {
    const mockMovie: movie = {
      img: 'movie.jpg',
      title: 'Test Movie',
      genre: 'Comedy',
      length: '90 min',
      ageRest: 'PG-13',
      premier: true,
      score: '7.5',
      description: 'A funny movie for testing purposes',
    };

    dataSource.adminAddMovie(mockMovie).subscribe((response) => {
      expect(response).toEqual(mockMovie);
    });

    const req = httpMock.expectOne(`${dataSource.baseUrl}films`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockMovie);
    req.flush(mockMovie);
  });
});
