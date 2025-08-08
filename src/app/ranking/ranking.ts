// src/app/ranking/ranking.ts

import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api'; // <-- IMPORTANTE

interface User {
  rank: number;
  name: string;
  completedLessons: number;
}

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonToggleModule, FormsModule],
  templateUrl: './ranking.html',
  styleUrls: ['./ranking.css'],
})
export class Ranking implements OnInit {
  private api = inject(Api); // <-- INYECTAR EL SERVICIO

  displayedColumns: string[] = ['rank', 'user', 'lessons'];
  currentUserName = 'Victoria Serra';
  selectedRanking: 'country' | 'organization' = 'country';

  // Datos reales (vía signals para standalone Angular moderno)
  countryRanking = signal<User[]>([]);
  organizationRanking = signal<User[]>([]);

  userId = '1301adf9-b6d0-4a39-acb9-c67c9b60ae7c'; // <-- Reemplazar por valor real
  courseId = 'e45c139c-03cb-4a54-b0a4-a6925eff2d8b'; // <-- Reemplazar por valor real

  ngOnInit() {
    this.fetchRanking('country');
    this.fetchRanking('organization');
  }

  ngOnChanges() {
    this.fetchRanking(this.selectedRanking); // si el componente recibe inputs
  }

  fetchRanking(tipo: 'country' | 'organization') {
    this.api
      .getRankingPosition({
        userId: this.userId,
        courseId: this.courseId,
        tipo: tipo,
      })
      .subscribe({
        next: (res) => {
          // res debe tener un array con el top y la posición del usuario
          // Suponemos que res tiene: { top: User[], user: User }
          const sorted = res.top || [];
          if (tipo === 'country') {
            this.countryRanking.set(sorted);
          } else {
            this.organizationRanking.set(sorted);
          }
        },
        error: (err) => {
          console.error(`Error al obtener ranking ${tipo}`, err);
        },
      });
  }

  get activeRanking(): User[] {
    return this.selectedRanking === 'country'
      ? this.countryRanking()
      : this.organizationRanking();
  }

  get topUsers(): User[] {
    return this.activeRanking.slice(0, 10);
  }

  get currentUser(): User | undefined {
    return this.activeRanking.find((u) => u.name === this.currentUserName);
  }

  get lessonsToNext(): number | null {
    if (!this.currentUser || this.currentUser.rank <= 1) return null;
    const userAbove = this.activeRanking.find(
      (u) => u.rank === this.currentUser!.rank - 1
    );
    return userAbove
      ? userAbove.completedLessons - this.currentUser.completedLessons
      : null;
  }

  getRankDisplay(rank: number): string | number {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return rank;
    }
  }
}
