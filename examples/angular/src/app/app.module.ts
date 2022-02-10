import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CryptoProComponent } from './crypto-pro-enhanced/crypto-pro-enhanced.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptoProComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
