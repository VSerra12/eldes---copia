// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
// import { Observable } from 'rxjs';

// export interface User {
//   rank: number;
//   name: string;
//   completedLessons: number;
// }

// @Injectable({
//   providedIn: 'root' // <-- ESTE es el "provider"
// })
// export class RankingService {
//   constructor(private http: HttpClient) {}

//   getRankingByCountry(): Observable<User[]> {
//     return this.http.get<User[]>(`${environment.apiUrl}/ranking/country`);
//   }

//   getRankingByOrganization(): Observable<User[]> {
//     return this.http.get<User[]>(`${environment.apiUrl}/ranking/organization`);
//   }

//   getCurrentUser(name: string): Observable<User> {
//     return this.http.get<User>(`${environment.apiUrl}/ranking/user?name=${name}`);
//   }
// }
