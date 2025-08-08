import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Api } from '../services/api'; // <-- NUEVO: importamos el servicio Api

@Component({
  selector: 'app-certificates',
  standalone: true,
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.css'],
  imports: [CommonModule, DatePipe],
})
export class Certificates {
  private api = inject(Api); // <-- NUEVO: inyectamos el servicio

  certificates = [
    {
      title: 'Curso básico de Lengua de Señas',
      date: '2025-06-10',
      description: 'Introducción a señas básicas.',
      image: 'assets/certificates/basic.png',
      organization: 'assets/eldes.png',
      user: 'Victoria Serra',
      type: '',
      signature1: 'assets/signatures/firma1.png',
      signature2: 'assets/signatures/firma2.png',
      url: 'https://miapp.com/certificados/curso-basico' // <-- link público al certificado
    },
    // otros certificados...
  ];

  selectedCertificate: any = this.certificates[0];
  activeFormat: 'pdf' | 'png' | 'jpg' | null = null;

  @ViewChild('certificateBox', { static: false })
  certificateBoxRef!: ElementRef;

  selectCertificate(cert: any) {
    this.selectedCertificate = cert;
    this.activeFormat = null;
  }

  async download(format: 'pdf' | 'png' | 'jpg') {
    this.activeFormat = format;
    const element = this.certificateBoxRef.nativeElement;
    const canvas = await html2canvas(element, { scale: 2 });

    const dataURL =
      format === 'jpg'
        ? canvas.toDataURL('image/jpeg', 1.0)
        : canvas.toDataURL('image/png');

    if (format === 'pdf') {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(dataURL, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${this.selectedCertificate.title}.pdf`);
    } else {
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `${this.selectedCertificate.title}.${format}`;
      link.click();
    }
  }

  share(platform: 'linkedin' | 'facebook') {
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
        if (shareUrl) {
          window.open(shareUrl, '_blank');
        } else {
          alert('No se pudo generar el link para compartir');
        }
      },
      error: (err) => {
        console.error('Error al compartir certificado', err);
        alert('Error al compartir el certificado');
      },
    });
  }
}
