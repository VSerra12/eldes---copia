import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ranking } from './ranking/ranking';
import { Certificates } from './certificates/certificates';
import { Home } from './home/home';

export const routes: Routes = [
  { path: 'ranking', component: Ranking, data: { title: '¡Mirá tu posición en el ranking! 📈' } },
  { path: 'certificates', component: Certificates, data: { title: '¡Mirá tus certificados! 🎓' } },
  { path: 'home', component: Home, data: { title: '¡Bienvenido a Eldes! 🚀' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
