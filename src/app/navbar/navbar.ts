import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- Add this import


@Component({
  selector: 'app-navbar',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSlideToggleModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  ayudaInteligente = false;

  cerrarSesion() {
    // lógica de logout
    console.log('Sesión cerrada');
  }

  onToggleAyuda() {
    console.log(
      'Ayuda inteligente:',
      this.ayudaInteligente ? 'activada' : 'desactivada'
    );
    // Aquí podés guardar la preferencia en localStorage o llamando a un servicio
  }
}
