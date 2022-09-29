import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationRoutingModule } from './application-routing.module';

import { HomeComponent } from '../pages/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

@NgModule({
  declarations: [ApplicationComponent, HomeComponent, NavbarComponent],
  imports: [CommonModule, ApplicationRoutingModule, NgbTooltipModule],
})
export class ApplicationModule {}
