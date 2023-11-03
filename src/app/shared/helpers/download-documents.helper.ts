import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class DownloadDocumentsHelper {
  constructor() {}

  downloadDocument(content: BlobPart, fileName: string, type?: string): void {
    const blob = new Blob([content], { type });
    saveAs(blob, fileName);
  }
}
