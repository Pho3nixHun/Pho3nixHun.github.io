import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ScrollButtonComponent,
  ScrollDirection
} from '../scroll-button/scroll-button.component';
import { TranslocoModule } from '@ngneat/transloco';
import { RandomKeyPipe } from '../random-key/random-key.pipe';
import { MediaSliderComponent } from '../media-slider/media-slider.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    ScrollButtonComponent,
    MediaSliderComponent,
    TranslocoModule,
    RandomKeyPipe
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  @HostBinding('class') class =
    /*tw*/ 'h-screen bg-hero-image bg-cover bg-top-center flex flex-col justify-center text-white pt-11';
  public ScrollDirection = ScrollDirection;
}
