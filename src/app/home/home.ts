import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Curso {
  title: string;
  description: string;
  difficulty: string;
  lessons: number;
  hours: string;
  event: string;
  tag1: string;
  tag2: string;
  tag3: string;
  image: string;
  loaded?: boolean; // 👈 agregado para controlar la carga
}

interface CoursesData {
  novedades: Curso[];
  continuar: Curso[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  // === Datos ===
  items: Curso[] = [];
  continueItems: Curso[] = [];

  // === Estado Novedades ===
  currentIndex = 0;
  itemsPerPage = 6;
  animationDirectionNovedades: 'left' | 'right' | null = null;
  loadedImagesNovedades = 0;
  allImagesLoadedNovedades = false;

  // === Estado Continuar ===
  continueIndex = 0;
  continueItemsPerPage = 3;
  animationDirectionContinue: 'left' | 'right' | null = null;
  loadedImagesContinue = 0;
  allImagesLoadedContinue = false;
  continueStartIndex = 0;

  // === Recomendadas ===
  recommendCards = [
    {
      title: 'Curso de lenguaje de señas básico',
      info: '20 Lecciones · 1 h 20 min',
      details: 'Aprendé los fundamentos del lenguaje de señas.',
    },
    {
      title: 'Curso avanzado de señas',
      info: '30 Lecciones · 2 h 10 min',
      details: 'Desarrollá fluidez en comunicación avanzada en señas.',
    },
    {
      title: 'Curso express',
      info: '10 Lecciones · 40 min',
      details: 'Una introducción rápida para situaciones cotidianas.',
    },
  ];

  expandedIndex: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCourses().subscribe((data: CoursesData) => {
      // Inicializamos con loaded = false
      this.items = data.novedades.map((c) => ({ ...c, loaded: false }));
      this.continueItems = data.continuar.map((c) => ({ ...c, loaded: false }));
    });
  }

  loadCourses(): Observable<CoursesData> {
    return this.http.get<CoursesData>('assets/data/courses.json');
  }

  // === Eventos de carga de imágenes ===
  onImageLoad(item: Curso, type: 'novedades' | 'continuar'): void {
    item.loaded = true;

    if (type === 'novedades') {
      this.loadedImagesNovedades++;
      if (this.loadedImagesNovedades >= this.itemsPerPage) {
        this.allImagesLoadedNovedades = true;
      }
    } else {
      this.loadedImagesContinue++;
      if (this.loadedImagesContinue >= this.continueItemsPerPage) {
        this.allImagesLoadedContinue = true;
      }
    }
  }

  // === Getters ===
  get visibleItems(): Curso[] {
    return this.items.slice(
      this.currentIndex,
      this.currentIndex + this.itemsPerPage
    );
  }

  get visibleContinueItems(): Curso[] {
    const total = this.continueItems.length;
    // Si hay menos de 3, muestra todas
    if (total <= 3) return this.continueItems;
    // Si el slide se pasa del final, toma desde el principio
    let items = [];
    for (let i = 0; i < 3; i++) {
      items.push(this.continueItems[(this.continueStartIndex + i) % total]);
    }
    return items;
  }

  // === Novedades ===
  prev(): void {
    if (!this.allImagesLoadedNovedades) return; // 👈 espera que carguen
    this.animationDirectionNovedades = 'left';
    requestAnimationFrame(() => {
      if (this.currentIndex === 0) {
        this.currentIndex = this.items.length - this.itemsPerPage;
      } else {
        this.currentIndex -= this.itemsPerPage;
      }
      this.animationDirectionNovedades = null;
      this.resetNovedadesLoad();
    });
  }

  next(): void {
    if (!this.allImagesLoadedNovedades) return; // 👈 espera que carguen
    this.animationDirectionNovedades = 'right';
    requestAnimationFrame(() => {
      if (this.currentIndex + this.itemsPerPage >= this.items.length) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += this.itemsPerPage;
      }
      this.animationDirectionNovedades = null;
      this.resetNovedadesLoad();
    });
  }

  // === Continuar aprendiendo ===
  prevContinue(): void {
    const total = this.continueItems.length;
    this.continueStartIndex = (this.continueStartIndex - 1 + total) % total;
  }

  nextContinue(): void {
    const total = this.continueItems.length;
    this.continueStartIndex = (this.continueStartIndex + 1) % total;
  }

  // === Helpers ===
  resetNovedadesLoad(): void {
    this.loadedImagesNovedades = 0;
    this.allImagesLoadedNovedades = false;
    this.visibleItems.forEach((c) => (c.loaded = false));
  }

  resetContinueLoad(): void {
    this.loadedImagesContinue = 0;
    this.allImagesLoadedContinue = false;
    this.visibleContinueItems.forEach((c) => (c.loaded = false));
  }

  toggleDropdown(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
