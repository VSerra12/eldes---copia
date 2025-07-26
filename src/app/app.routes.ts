import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ranking } from './ranking/ranking';
import { Certificates } from './certificates/certificates';

export const routes: Routes = [
  { path: 'ranking', component: Ranking, data: { title: '¡Mirá tu posición en el ranking! 📈' } },
  { path: 'certificates', component: Certificates, data: { title: '¡Mirá tus certificados! 🎓' } },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
