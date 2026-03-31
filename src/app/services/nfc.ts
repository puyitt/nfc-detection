// src/app/services/nfc.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NfcService {
  scannedId = signal<string | null>(null);
  isScanning = signal<boolean>(false); // Scan ဖတ်နေဆဲလား သိဖို့

  async startScan() {
    if ('NDEFReader' in window) {
      try {
        const reader = new (window as any).NDEFReader();
        this.isScanning.set(true); // Scanning စပြီ

        await reader.scan();
        
        reader.onreading = (event: any) => {
          this.scannedId.set(event.serialNumber);
          this.isScanning.set(false); // ဖတ်ပြီးသွားရင် ရပ်လိုက်မယ်
        };

        // Error တက်ရင်လည်း Scanning status ကို ပိတ်ပေးရမယ်
        reader.onreadingerror = () => {
          alert("Card ဖတ်လို့မရပါဘူး။");
          this.isScanning.set(false);
        };

      } catch (error) {
        console.error(error);
        this.isScanning.set(false);
      }
    }
  }
}