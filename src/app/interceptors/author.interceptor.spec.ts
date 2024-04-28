import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AUTHOR_ID } from '../constants/constants';
import { AuthorInterceptor } from './author.interceptor';

describe('AuthorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const mockAuthorId = '1234'


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthorInterceptor, multi: true },
        { provide: AUTHOR_ID, useValue: mockAuthorId },
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should add in the header the authorId in the requests HTTP', () => {
    httpClient.get('/test').subscribe(() => {
    });

    const req = httpMock.expectOne('/test');

    expect(req.request.headers.get('authorId')).toBe('1234');

    req.flush({});
  });
});

