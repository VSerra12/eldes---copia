// api.ts

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

// ✅ Nueva interface para el endpoint de cursos completados
export interface CompletedCourse {
  courseId: string;
  courseName: string;
  userName: string;
  lastUpdated: string; // Podés mapearlo como Date después si querés
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://localhost:5283'; // Cambiá por la URL real de tu backend

  constructor(private http: HttpClient) {}

  getUserRanking(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/ranking/user/${userId}`);
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

  // ✅ Nuevo método para traer los cursos completados de un usuario
  getCompletedCourses(userId: string): Observable<CompletedCourse[]> {
    return this.http.get<CompletedCourse[]>(
      `${this.baseUrl}/certificate/completed-courses/${userId}`
    );
  }
}
