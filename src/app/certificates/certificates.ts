import { Component, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.css'],
  imports: [CommonModule, DatePipe] // <-- Add DatePipe here

})
export class Certificates {
  certificates = [
    {
      title: 'Basic Sign Language Course',
      date: '2025-06-10',
      description: 'Introduction to basic signs.',
      image: 'assets/certificates/basic.png'
    },
    {
      title: 'Intermediate Course',
      date: '2025-07-15',
      description: 'Conversational fluency in sign language.',
      image: 'assets/certificates/intermediate.png'
    }
  ];

  selectedCertificate: any = this.certificates[0];

  @ViewChild('certificateBox', { static: false }) certificateBoxRef!: ElementRef;

  selectCertificate(cert: any) {
    this.selectedCertificate = cert;
  }

  async download(format: 'png' | 'jpg' | 'pdf') {
    const element = this.certificateBoxRef.nativeElement;

    const canvas = await html2canvas(element, { scale: 2 });
    const dataURL = format === 'jpg'
      ? canvas.toDataURL('image/jpeg', 1.0)
      : canvas.toDataURL('image/png');

    if (format === 'pdf') {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
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
}
