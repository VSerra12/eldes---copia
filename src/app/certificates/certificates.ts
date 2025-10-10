import { Component, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Api, CompletedCourse } from '../services/api';
import { DatePipe, CommonModule } from '@angular/common';

interface Certificate {
  title: string;
  date: string;
  description: string;
  image: string;
  organization: string;
  user: string;
  type: string;
  signature1: string;
  signature2: string;
  url: string;
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.css'],
  imports: [CommonModule, DatePipe, FormsModule], 
})
export class Certificates implements OnInit {
  private api = inject(Api);

  certificates: Certificate[] = [];
  selectedCertificate: Certificate | null = null;
  activeFormat: 'pdf' | 'png' | 'jpg' | null = null;

  // --- Para enviar email ---
  toEmail = '';            // mail ingresado por el usuario
  sending = false;         

  @ViewChild('certificateBox', { static: false })
  certificateBoxRef!: ElementRef;

  ngOnInit(): void {
    const userId = 'e1d6f577-9d82-4272-b55f-341856748156'; // reemplazar por real
    this.api.getCompletedCourses(userId).subscribe({
      next: (courses: CompletedCourse[]) => {
        this.certificates = courses.map(c => ({
          title: c.courseName,
          date: c.lastUpdated,
          description: '',
          image: 'assets/certificates/basic.png',
          organization: 'assets/eldes.png',
          user: c.userName,
          type: '',
          signature1: 'assets/signatures/firma1.png',
          signature2: 'assets/signatures/firma2.png',
          url: `https://miapp.com/certificados/${c.courseId}`
        }));
        this.selectedCertificate = this.certificates[0] ?? null;
      },
      error: (err) => console.error('Error cargando cursos completados:', err)
    });
  }

  selectCertificate(cert: Certificate) {
    this.selectedCertificate = cert;
    this.activeFormat = null;
  }

  async download(format: 'pdf' | 'png' | 'jpg') {
    if (!this.selectedCertificate || !this.certificateBoxRef) return;
    this.activeFormat = format;

    const element = this.certificateBoxRef.nativeElement;

    // Fuerza el tamaño desktop antes de capturar
    element.style.width = '1000px';
    element.style.height = '650px';

    // Espera a que el layout se actualice
    await new Promise(resolve => setTimeout(resolve, 50));

    const canvas = await html2canvas(element, {
      width: 1000,
      height: 650,
      scale: 2
    });

    // Opcional: restaura el tamaño original si lo modificaste
    element.style.width = '';
    element.style.height = '';

    const dataURL =
      format === 'jpg'
        ? canvas.toDataURL('image/jpeg', 1.0)
        : canvas.toDataURL('image/png');

    if (format === 'pdf') {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1000, 650],
      });
      pdf.addImage(dataURL, 'PNG', 0, 0, 1000, 650);
      pdf.save(`${this.selectedCertificate.title}.pdf`);
    } else {
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `${this.selectedCertificate.title}.${format}`;
      link.click();
    }
  }

  share(platform: 'linkedin' | 'facebook') {
    if (!this.selectedCertificate) return;
    const payload = {
      nombre: this.selectedCertificate.user,
      nombreCurso: this.selectedCertificate.title,
      redesYUrls: {
        [platform]: this.selectedCertificate.url,
      },
    };
    this.api.shareCertificate(payload).subscribe({
      next: (res) => {
        const shareUrl = res[platform];
        if (shareUrl) window.open(shareUrl, '_blank');
        else alert(`No se pudo generar el link para compartir en ${platform}`);
      },
      error: (err) => {
        console.error('Error al compartir certificado', err);
        alert('Error al compartir el certificado');
      },
    });
  }

  send() {
    if (!this.selectedCertificate) {
      alert('Primero seleccioná un certificado.');
      return;
    }
    const email = this.toEmail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Ingresá un email válido.');
      return;
    }

    const userName = this.selectedCertificate.user;   
    const courseName = this.selectedCertificate.title;
    this.sending = true;
    this.api.sendEmail(email, userName, courseName).subscribe({
      next: () => {
        this.sending = false;
        alert('Correo enviado correctamente ✅');
      },
      error: (err) => {
        this.sending = false;
        console.error('Error al enviar correo', err);
        alert('No se pudo enviar el correo.');
      }
    });
  }
}
