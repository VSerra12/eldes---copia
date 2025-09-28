import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ranking } from './ranking/ranking';
import { Certificates } from './certificates/certificates';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home, data: { title: '¡Bienvenido a Eldes! 🚀' } },
  { path: 'home', component: Home, data: { title: '¡Bienvenido a Eldes! 🚀' } },
  { path: 'ranking', component: Ranking, data: { title: '¡Mirá tu posición en el ranking! 📈' } },
  { path: 'certificates', component: Certificates, data: { title: '¡Mirá tus certificados! 🎓' } },

  // opcional: ruta comodín (404)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
