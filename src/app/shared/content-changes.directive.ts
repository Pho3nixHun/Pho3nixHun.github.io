import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  Input,
  WritableSignal,
  inject
} from '@angular/core';

@Directive({
  selector: '[appContentChanges]',
  standalone: true
})
export class ContentChangesDirective implements AfterViewInit {
  @Input('appContentChanges') content$?: WritableSignal<Element[]>;
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private destroyRef = inject(DestroyRef);
  public ngAfterViewInit(): void {
    // Set initial value. SetTimeout is needed to avoid ExpressionChangedAfterItHasBeenCheckedError.
    setTimeout(() => {
      this.content$?.set(Array.from(this.elementRef.nativeElement.children));
    });
    const observer = new MutationObserver(() => {
      const children = Array.from(this.elementRef.nativeElement.children);
      if (this.content$) {
        this.content$.set(children);
      }
    });
    observer.observe(this.elementRef.nativeElement, {
      childList: true,
      subtree: true
    });
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
