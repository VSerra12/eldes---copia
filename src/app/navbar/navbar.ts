import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';

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
    MatToolbarModule,
    MatSidenavModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  ayudaInteligente = false;
  mobileMenuOpen = false;
  cuentaExpandida = false; // <--- Agrega esta línea

  cerrarSesion() {
    // lógica de logout
    console.log('Sesión cerrada');
  }

  onToggleAyuda() {
    console.log(
      'Ayuda inteligente:',
      this.ayudaInteligente ? 'activada' : 'desactivada'
    );
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  openSettings() {
    // lógica para abrir ajustes
    this.closeMobileMenu();
  }
}
