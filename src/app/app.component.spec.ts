import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    component = TestBed.get(AppComponent);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should search for movies', () => {
    const searchTerm = 'Avatar';
    const mockResponse = {
      Search: [
        {
          Title: 'Avatar',
          Year: '2009',
          imdbID: 'tt0499549',
          Type: 'movie',
          Poster: 'https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg'
        },
        {
          Title: 'Avatar: The Last Airbender',
          Year: '2005–2008',
          imdbID: 'tt0417299',
          Type: 'series',
          Poster: 'https://m.media-amazon.com/images/M/MV5BZTQ2MzkyYjItMGRlMS00ODU5LWFlZDItNzkwNTU5N2Q2Y2Y0XkEyXkFqcGdeQXVyNjE0ODUyNjU@._V1_SX300.jpg'
        }
      ]
    };

    component.SearchMovies(searchTerm).then(() => {
      expect(component.movies).toEqual(mockResponse.Search);
    });

    const req = httpTestingController.expectOne(`https://omdbapi.com/?apikey=575beaf2&s=${searchTerm}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });
});
