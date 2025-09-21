import { Component, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Api, CompletedCourse } from '../services/api'; // importamos el nuevo tipo

@Component({
  selector: 'app-certificates',
  standalone: true,
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.css'],
  imports: [CommonModule, DatePipe],
})
export class Certificates implements OnInit {
  private api = inject(Api);

  certificates: any[] = []; 
  selectedCertificate: any = null;
  activeFormat: 'pdf' | 'png' | 'jpg' | null = null;

  @ViewChild('certificateBox', { static: false })
  certificateBoxRef!: ElementRef;

  ngOnInit(): void {
    const userId = '4c87eeed-1a39-417d-bec3-337faa5d4988'; // ID de usuario fijo para este ejemplo
    this.api.getCompletedCourses(userId).subscribe({
      next: (courses: CompletedCourse[]) => {
        
        this.certificates = courses.map(c => ({
          title: c.courseName,
          date: c.lastUpdated,
          description: '', // si en el futuro hay descripción
          image: 'assets/certificates/basic.png', // placeholder si tenés plantillas
          organization: 'assets/eldes.png',
          user: c.userName,
          type: '',
          signature1: 'assets/signatures/firma1.png',
          signature2: 'assets/signatures/firma2.png',
          url: `https://miapp.com/certificados/${c.courseId}` // URL pública por curso
        }));

        // seleccionar el primero por defecto
        if (this.certificates.length > 0) {
          this.selectedCertificate = this.certificates[0];
        }
      },
      error: (err) => {
        console.error('Error cargando cursos completados:', err);
      }
    });
  }

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
