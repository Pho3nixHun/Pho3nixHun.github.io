import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentChangesDirective } from '../content-changes.directive';

const isEventWithTarget = (
  event: Event | null
): event is Event & { target: Element } => event?.target instanceof Element;

const calculateDeltaX = (element: Element, base = 0): number => {
  const { x, width } = element.getBoundingClientRect();
  const mid = x + width / 2;
  return Math.abs(base - mid);
};

@Component({
  selector: 'app-media-slider',
  standalone: true,
  imports: [CommonModule, ContentChangesDirective],
  templateUrl: './media-slider.component.html',
  styleUrls: ['./media-slider.component.scss']
})
export class MediaSliderComponent {
  public elements$ = signal<Element[]>([]);
  public scroll$ = signal<Event | null>(null);
  public elementInView$ = computed(() => {
    const elements = this.elements$();
    const scrollEvent = this.scroll$();
    const hasEventTarget = isEventWithTarget(scrollEvent);
    if (scrollEvent === null || !hasEventTarget) {
      return elements[0];
    }
    const { x: parentX, width: parentWidth } =
      scrollEvent.target.getBoundingClientRect();
    const parentMid = parentX + parentWidth / 2;
    const elementDeltas = elements.map((element) =>
      calculateDeltaX(element, parentMid)
    );
    const elementInViewIndex = elementDeltas.indexOf(
      Math.min(...elementDeltas)
    );
    return elements[elementInViewIndex];
  });
  public click$ = signal<Event | null>(null);
  public clickEffect$ = effect(() => {
    const clickEvent = this.click$();
    if (!isEventWithTarget(clickEvent)) {
      return;
    }
    const elements = this.elements$();
    if (elements.includes(clickEvent.target)) {
      this.scrollTo(clickEvent.target);
    }
  });
  public scrollTo(el: Element) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }
}
