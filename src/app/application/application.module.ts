import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';

import { ApplicationRoutingModule } from './application-routing.module';

import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

@NgModule({
  declarations: [ApplicationComponent, HomeComponent, NavbarComponent],
  imports: [CommonModule, ApplicationRoutingModule],
})
export class ApplicationModule {}
