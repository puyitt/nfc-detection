import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NfcService {
  // Angular Signals သုံးပြီး Card ID ကို သိမ်းထားမယ်
  scannedId = signal<string | null>(null);

  async startScan() {
    if ('NDEFReader' in window) {
      try {
        const reader = new (window as any).NDEFReader();
        await reader.scan();
        
        reader.onreading = (event: any) => {
          this.scannedId.set(event.serialNumber);
          console.log("Scanned ID:", event.serialNumber);
        };

      } catch (error) {
        console.error("NFC Error:", error);
      }
    } else {
      alert("NFC မရပါဘူး။ Android Chrome နဲ့ စမ်းပေးပါ။");
    }
  }
}