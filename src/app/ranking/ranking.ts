import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

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
export class Ranking {
  displayedColumns: string[] = ['rank', 'user', 'lessons'];
  currentUserName = 'Victoria Serra';
  selectedRanking: 'country' | 'organization' = 'country';

  // Rankings simulados
  countryRanking: User[] = [
    { rank: 1, name: 'Lucía Gómez', completedLessons: 24 },
    { rank: 2, name: 'Martín Pérez', completedLessons: 21 },
    { rank: 3, name: 'Carlos Díaz', completedLessons: 20 },
    { rank: 4, name: 'Ana Torres', completedLessons: 19 },
    { rank: 5, name: 'Pedro Ruiz', completedLessons: 18 },
    { rank: 6, name: 'Pedro Ruiz', completedLessons: 18 },
    { rank: 7, name: 'Pedro Ruiz', completedLessons: 18 },
    { rank: 8, name: 'Pedro Ruiz', completedLessons: 18 },
    { rank: 9, name: 'Victoria Serra', completedLessons: 17 },
    { rank: 10, name: 'Victoria Serra', completedLessons: 17 },
  ];

  organizationRanking: User[] = [
    { rank: 1, name: 'Lucía Gómez', completedLessons: 22 },
    { rank: 2, name: 'Victoria Serra', completedLessons: 20 },
    { rank: 3, name: 'Matías Luján', completedLessons: 18 },
    { rank: 4, name: 'Eugenia Torres', completedLessons: 15 },
    { rank: 5, name: 'Mario Rivas', completedLessons: 14 },
  ];

  get activeRanking(): User[] {
    return this.selectedRanking === 'country'
      ? this.countryRanking
      : this.organizationRanking;
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