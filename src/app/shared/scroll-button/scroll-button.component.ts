import { Component, HostListener, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export enum ScrollDirection {
  Down = 'down',
  Up = 'up',
  Left = 'left',
  Right = 'right'
}

@Component({
  selector: 'app-scroll-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './scroll-button.component.html',
  styleUrls: ['./scroll-button.component.scss'],
  host: {
    class: /*tw*/ 'flex justify-around cursor-pointer w-full'
  }
})
export class ScrollButtonComponent {
  private faIconLibrary = inject(FaIconLibrary)
  public icons = this.faIconLibrary.addIcons(
    faAngleDown
  );
  public ScrollDirection = ScrollDirection;

  @Input() public direction: ScrollDirection = ScrollDirection.Left;

  @HostListener('click')
  public scroll() {
    switch (this.direction) {
      case 'down':
        this.scrollDown();
        break
      case 'up':
        this.scrollUp();
        break
      case 'left':
        this.scrollLeft();
        break
      case 'right':
        this.scrollRight();
        break
    }
  }

  public scrollDown() {
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: 'smooth'
    });
  }
  public scrollUp() {
    window.scrollTo({
      top: window.scrollY - window.innerHeight,
      behavior: 'smooth'
    });
  }
  public scrollLeft() {
    window.scrollTo({
      left: window.scrollX - window.innerWidth,
      behavior: 'smooth'
    });
  }
  public scrollRight() {
    window.scrollTo({
      left: window.scrollX + window.innerWidth,
      behavior: 'smooth'
    });
  }
}
