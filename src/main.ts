import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { App } from './app/app';
import { routes } from './app/app.routes'; // o donde tengas tus rutas

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes) // 💥 esto habilita ActivatedRoute y routing
  ]
});
