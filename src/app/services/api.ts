import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  rank: number;
  name: string;
  completedLessons: number;
}

export interface RankingRequest {
  userId: string;
  courseId: string;
  tipo: 'country' | 'organization';
}

export interface RankingResponse {
  top: User[];
  user: User;
}

export interface ShareCertificateRequest {
  nombre: string;
  nombreCurso: string;
  redesYUrls: { [key: string]: string };
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'https://localhost:5000'; // Cambiá por la URL real de tu backend

  constructor(private http: HttpClient) {}

  // Obtener ranking por tipo (country / organization)
  getRankingPosition(payload: RankingRequest): Observable<RankingResponse> {
    return this.http.post<RankingResponse>(
      `${this.baseUrl}/ranking/position`,
      payload
    );
  }

  // Obtener ranking global por userId
  getGlobalRanking(userId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/ranking/global/${userId}`);
  }

  // Compartir certificado (Facebook, LinkedIn, etc.)
  shareCertificate(
    payload: ShareCertificateRequest
  ): Observable<{ [key: string]: string }> {
    return this.http.post<{ [key: string]: string }>(
      `${this.baseUrl}/share-certificate`,
      payload
    );
  }
}
