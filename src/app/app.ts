import { Component, inject } from '@angular/core';
import { NfcService } from './services/nfc';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div style="text-align: center; padding: 50px; font-family: sans-serif;">
      <h1>NFC Todo Reporter</h1>

      @if (!nfc.isScanning()) {
        <button (click)="nfc.startScan()" 
                style="padding: 15px 30px; font-size: 1.2rem; background: #007bff; color: white; border: none; border-radius: 8px;">
          NFC ဖတ်ရန် နှိပ်ပါ
        </button>
      } @else {
        <div class="scanner-box">
          <div class="spinner"></div>
          <p style="color: #555; font-weight: bold;">Scanning... ကတ်ကို ဖုန်းနားကပ်ပေးပါ</p>
        </div>
      }

      @if (nfc.scannedId()) {
        <div style="margin-top: 30px; padding: 20px; border: 1px dashed #28a745; border-radius: 10px;">
          <h3 style="color: #28a745;">✅ Card Detected!</h3>
          <p>ID: <strong>{{ nfc.scannedId() }}</strong></p>
          <button (click)="reset()">နောက်တစ်ကြိမ်ပြန်ဖတ်ရန်</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 10px;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .scanner-box { border: 2px solid #007bff; padding: 20px; border-radius: 10px; background: #e7f3ff; }
  `]
})
export class AppComponent {
  nfc = inject(NfcService);

  reset() {
    this.nfc.scannedId.set(null);
  }
}