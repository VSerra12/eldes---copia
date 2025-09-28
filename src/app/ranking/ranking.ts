import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';

interface RankingEntry {
  rank: number;
  userName: string;
  points: number;
}

interface RankingInfo {
  position: number;
  points: number;
}

interface CombinedRankingResult {
  globalRanking: RankingInfo;
  organizationRanking?: RankingInfo;
  top5Global: RankingEntry[];
  top5Organization?: RankingEntry[];
}

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonToggleModule],
  templateUrl: './ranking.html',
  styleUrls: ['./ranking.css'],
})
export class Ranking implements OnInit {
  private api = inject(Api);

  displayedColumns: string[] = ['rank', 'user', 'lessons'];

  selectedRanking: 'country' | 'organization' = 'country';
  userId = 'bb1ec047-cba7-44dc-9924-42f4666f6a57';

  // Signals
  topGlobal = signal<RankingEntry[]>([]);
  topOrganization = signal<RankingEntry[]>([]);
  currentUser = signal<RankingEntry | null>(null);

  lessonsToNext: number | null = null;
  hasOrganizationRanking = signal(false);

  ngOnInit(): void {
    this.fetchRanking();
  }

  fetchRanking() {
    this.api.getUserRanking(this.userId).subscribe({
      next: (res: CombinedRankingResult) => {
        // Mapear Global
        this.topGlobal.set(
          res.top5Global.map((u, index) => ({
            rank: index + 1,
            userName: u.userName,
            points: u.points,
          }))
        );

        // Mapear Organización
        if (res.organizationRanking && res.top5Organization) {
          this.topOrganization.set(
            res.top5Organization.map((u, index) => ({
              rank: index + 1,
              userName: u.userName,
              points: res.organizationRanking?.points ?? 0,
            }))
          );
          this.hasOrganizationRanking.set(true);
        } else {
          this.hasOrganizationRanking.set(false);
          this.selectedRanking = 'country';
        }

        // Inicializar currentUser según ranking seleccionado
        this.updateCurrentUser(res);

        // Calcular diferencia
        this.calculateLessonsToNext(res);
      },
      error: (err) => console.error('Error al obtener ranking', err),
    });
  }

  updateCurrentUser(res: CombinedRankingResult) {
    if (this.selectedRanking === 'country') {
      this.currentUser.set({
        rank: res.globalRanking.position,
        userName: 'You',
        points: res.globalRanking.points,
      });
    } else if (res.organizationRanking) {
      this.currentUser.set({
        rank: res.organizationRanking.position,
        userName: 'You',
        points: res.organizationRanking.points,
      });
    }
  }

  onRankingTypeChange() {
    this.api.getUserRanking(this.userId).subscribe({
      next: (res) => {
        this.updateCurrentUser(res);
        this.calculateLessonsToNext(res);
      },
    });
  }

  calculateLessonsToNext(res: CombinedRankingResult) {
    let activeRanking =
      this.selectedRanking === 'country'
        ? res.top5Global
        : res.top5Organization || [];

    const userRank =
      this.selectedRanking === 'country'
        ? res.globalRanking.position
        : res.organizationRanking?.position;

    if (!userRank) {
      this.lessonsToNext = null;
      return;
    }

    const currentIndex = activeRanking.findIndex((u) => u.rank === userRank);

    if (currentIndex > 0) {
      const currentUser = activeRanking[currentIndex];
      const nextUser = activeRanking[currentIndex - 1];
      this.lessonsToNext =
        nextUser.points - currentUser.points;
    } else {
      this.lessonsToNext = null; // ya está en el top
    }
  }

  get topUsers(): RankingEntry[] {
    return this.selectedRanking === 'country'
      ? this.topGlobal()
      : this.topOrganization();
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
