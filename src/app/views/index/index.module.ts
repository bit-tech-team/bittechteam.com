import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsComponent } from './pages/terms/terms.component';
import { IndexComponent } from './index.component';
import { WaifuComponent } from '../../components/waifu/waifu.component';
import { SharedModule } from '../../shared/shared.module';
import { IndexRoutingModule } from './index-routing.module';

@NgModule({
  declarations: [TermsComponent, IndexComponent, WaifuComponent],
  imports: [CommonModule, SharedModule, IndexRoutingModule],
})
export class IndexModule {}
