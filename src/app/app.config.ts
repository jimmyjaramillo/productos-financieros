import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { API_URL, AUTHOR_ID } from './constants/constants';
import { AuthorInterceptor } from './interceptors/author.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: API_URL, useValue: process.env["API_URL"] },
    { provide: AUTHOR_ID, useValue: process.env["AUTHOR_ID"] },
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),{provide: HTTP_INTERCEPTORS, useClass: AuthorInterceptor, multi: true}
  ]
};
