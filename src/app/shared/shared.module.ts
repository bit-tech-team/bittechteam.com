import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavMainComponent } from './navbars/nav-main/nav-main.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [NavMainComponent],
  imports: [CommonModule, MaterialModule],
  exports: [NavMainComponent],
})
export class SharedModule {}
