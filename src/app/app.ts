import { Component, inject } from '@angular/core';
import { NfcService } from './services/nfc';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div style="text-align: center; padding: 50px;">
      <h1>NFC Todo Reporter</h1>
      
      <button (click)="nfc.startScan()" style="padding: 15px; cursor: pointer;">
        NFC ဖတ်ရန် နှိပ်ပါ
      </button>

      @if (nfc.scannedId()) {
        <div style="margin-top: 20px; color: green;">
          <h3>Card ID: {{ nfc.scannedId() }}</h3>
          <p>ဒီ Card အတွက် Todo List တွေ ဒီမှာပြမယ်...</p>
        </div>
      }
    </div>
  `
})
export class AppComponent {
  nfc = inject(NfcService);
}