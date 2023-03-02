import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { API_URL } from 'src/app/core/env.token';
import { AuthResponse } from './shared/auth.interfaces';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: API_URL, useValue: 'http://localhost:3000' }]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login successfully', () => {
    const email = 'test@example.com';
    const password = 'password';
    const expectedAuthResponse: AuthResponse = {
      accessToken: 'token',
      user: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: email,
        role: 'user',
        phone: '123-456-789'
      }
    };

    authService.login(email, password).subscribe((authResponse: AuthResponse) => {
      expect(authResponse).toEqual(expectedAuthResponse);
    });

    const req = httpMock.expectOne(`${API_URL}/login`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ email, password });
    req.flush(expectedAuthResponse);
  });

  it('should return an error when login fails', () => {
    const email = 'test@example.com';
    const password = 'wrongpassword';
    const errorResponse = { status: 401, statusText: 'Unauthorized' };

    authService.login(email, password).subscribe(
      () => {
        fail('should have failed with an error');
      },
      (error) => {
        expect(error.status).toEqual(errorResponse.status);
        expect(error.statusText).toEqual(errorResponse.statusText);
      }
    );

    const req = httpMock.expectOne(`${API_URL}/login`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ email, password });
    req.flush(null, errorResponse);
  });
});
