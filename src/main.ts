import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { App } from './app/app';
import { routes } from './app/app.routes'; 

registerLocaleData(localeEs, 'es-AR');

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes), // 💥 esto habilita ActivatedRoute y routing
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es-AR' } 
  ]
});
