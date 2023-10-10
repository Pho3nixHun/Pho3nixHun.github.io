import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  WritableSignal,
  inject
} from '@angular/core';
import { Subject } from 'rxjs';

const isSubject = <T>(value: any): value is Subject<T> =>
  value instanceof Subject;
const isSignal = <T>(value: any): value is WritableSignal<T> =>
  value?.set !== undefined;

@Directive({
  selector: '[appElementRef]',
  standalone: true
})
export class ElementRefDirective<T> implements AfterViewInit {
  @Input('appElementRef')
  public attachedSignal$!:
    | WritableSignal<ElementRef<T> | null>
    | Subject<ElementRef<T>>;
  private elementRef: ElementRef<T> = inject(ElementRef);
  public ngAfterViewInit(): void {
    if (isSubject(this.attachedSignal$)) {
      this.attachedSignal$.next(this.elementRef);
    }
    if (isSignal(this.attachedSignal$)) {
      this.attachedSignal$?.set(this.elementRef);
    }
  }
}
