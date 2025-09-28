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

export interface CompletedCourse {
  courseId: string;
  courseName: string;
  userName: string;
  lastUpdated: string; 
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://localhost:5283'; 

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

  sendEmail(toEmail: string, userName: string, courseName: string) {
    const payload = {
      toEmail: toEmail,
      toName: userName, 
      fromEmail: 'bautidenueve@gmail.com',
      fromName: 'Eldes Notificaciones',
      templateId: 'd-3905d390a8164a7caa4ca54cb81e520a',
      dynamicTemplateData: {
        user_name: userName,
        course_name: courseName,
        link_certificate: 'https://curso.somoseldes.com/',
        link_courses: 'https://www.google.com',
        unsubscribe_link: 'https://www.google.com/unsuscribe',
      },
    };

    return this.http.post('http://localhost:5283/send-email', payload);
  }
}
