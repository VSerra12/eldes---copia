import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`);
  currentIndex = 0;
  itemsPerPage = 6;

  animationDirection: 'left' | 'right' | null = null;

  continueItems = ['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4', 'Curso 5'];
  continueStartIndex = 0;

  get visibleItems() {
    return this.items.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  get visibleContinueItems() {
    return this.continueItems.slice(this.continueStartIndex, this.continueStartIndex + 3);
  }

  prev() {
    this.animationDirection = 'left';
    setTimeout(() => {
      if (this.currentIndex === 0) {
        // si está en la primera, salta al final
        this.currentIndex = this.items.length - this.itemsPerPage;
      } else {
        this.currentIndex -= this.itemsPerPage;
      }
      this.animationDirection = null;
    }, 300);
  }

  next() {
    this.animationDirection = 'right';
    setTimeout(() => {
      if (this.currentIndex + this.itemsPerPage >= this.items.length) {
        // si está en la última, vuelve al inicio
        this.currentIndex = 0;
      } else {
        this.currentIndex += this.itemsPerPage;
      }
      this.animationDirection = null;
    }, 300);
  }

  prevContinue() {
    if (this.continueStartIndex > 0) {
      this.continueStartIndex--;
    }
  }

  nextContinue() {
    if (this.continueStartIndex < this.continueItems.length - 3) {
      this.continueStartIndex++;
    }
  }
}
