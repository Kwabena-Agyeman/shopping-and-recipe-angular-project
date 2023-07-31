import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [LoadingComponent, AlertComponent],
  imports: [CommonModule],
  exports: [LoadingComponent, AlertComponent],
})
export class SharedModule {}
