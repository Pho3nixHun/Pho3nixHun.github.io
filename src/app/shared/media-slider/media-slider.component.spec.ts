import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSliderComponent } from './media-slider.component';

describe('MediaSliderComponent', () => {
  let component: MediaSliderComponent;
  let fixture: ComponentFixture<MediaSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MediaSliderComponent]
    });
    fixture = TestBed.createComponent(MediaSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
