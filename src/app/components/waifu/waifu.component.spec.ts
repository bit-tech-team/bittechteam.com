import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaifuComponent } from './waifu.component';

describe('WaifuComponent', () => {
  let component: WaifuComponent;
  let fixture: ComponentFixture<WaifuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaifuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaifuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
