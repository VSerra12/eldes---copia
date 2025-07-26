import { Component, ViewChild, ElementRef } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-certificates',
  standalone: true,
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.css'],
  imports: [CommonModule, DatePipe],
})
export class Certificates {
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
    },
    {
      title: 'Curso intermedio de Lengua de Señas',
      date: '2025-07-15',
      description: 'Fluidez conversacional en LSA.',
      image: 'assets/certificates/intermediate.png',
      organization: 'assets/eldes.png',
      user: 'Victoria Serra',
      type: '',
      signature1: 'assets/signatures/firma1.png',
      signature2: 'assets/signatures/firma2.png',
    },
  ];

  selectedCertificate: any = this.certificates[0];
  activeFormat: 'pdf' | 'png' | 'jpg' | null = null;

  @ViewChild('certificateBox', { static: false })
  certificateBoxRef!: ElementRef;

  selectCertificate(cert: any) {
    this.selectedCertificate = cert;
    this.activeFormat = null; // resetea formato activo al cambiar de certificado
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
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(
      `Mirá mi certificado de ${this.selectedCertificate.title}`
    );
    let shareUrl = '';

    if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }

    window.open(shareUrl, '_blank');
  }
}
