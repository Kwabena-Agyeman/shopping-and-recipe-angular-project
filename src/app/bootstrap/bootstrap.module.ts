import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [],
  imports: [CollapseModule.forRoot(), BsDropdownModule.forRoot()],
  exports: [CollapseModule, BsDropdownModule],
})
export class BootstrapModule {}
