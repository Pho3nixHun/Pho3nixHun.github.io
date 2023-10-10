import { Component, ElementRef, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementRefDirective } from '../element-ref.directive';
import {
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  filter,
  map,
  scan,
  shareReplay,
  startWith,
  switchMap
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

class Particle {
  private x = Math.random() * this.width;
  private y = Math.random() * this.height;
  private color = `rgba(255, 255, 255, ${Math.random().toFixed(2)})`;
  private radius = Math.random() * 2;
  private vectorX = Math.random() - 0.5;
  private vectorY = Math.random() + 0.5;
  constructor(
    private width: number,
    private height: number,
    private ctx: CanvasRenderingContext2D
  ) {}

  public step() {
    const { ctx, x, y, radius, color } = this;
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(1, color);
    gradient.addColorStop(1, 'rgb(66, 66, 66)');
    ctx.fillStyle = gradient;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    this.updatePosition();
  }

  private updatePosition() {
    this.x += this.vectorX;
    this.y += this.vectorY;
    if (this.x < -25) this.x = this.width + 25;
    if (this.y < -25) this.y = this.height + 25;
    if (this.x > this.width + 25) this.x = -25;
    if (this.y > this.height + 25) this.y = -25;
  }
}

@Component({
  selector: 'app-snowfall',
  standalone: true,
  imports: [CommonModule, ElementRefDirective],
  template:
    '<canvas [appElementRef]="canvasSubject$" class="bg-[inherit]"> </canvas>'
})
export class SnowfallComponent {
  @Input() particles = 100;
  @Input() speed = 0.5;
  @Input() fps = 60;

  public canvasSubject$ = new Subject<ElementRef<HTMLCanvasElement>>();
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private domRect$ = new Observable<DOMRect>((subscriber) => {
    const observer = new ResizeObserver(() =>
      subscriber.next(this.elementRef.nativeElement.getBoundingClientRect())
    );
    observer.observe(this.elementRef.nativeElement);
    return () => observer.disconnect();
  }).pipe(
    startWith(this.elementRef.nativeElement.getBoundingClientRect()),
    takeUntilDestroyed(),
    debounceTime(100),
    shareReplay(1)
  );
  private canvas$ = this.canvasSubject$.pipe(
    switchMap((canvasRef) =>
      new Observable<HTMLCanvasElement>((subscriber) => {
        const observer = new ResizeObserver(() =>
          subscriber.next(canvasRef.nativeElement)
        );
        observer.observe(canvasRef.nativeElement);
        return () => observer.disconnect();
      }).pipe(debounceTime(100))
    ),
    shareReplay(1)
  );
  private ctx$ = this.canvas$.pipe(
    map((canvas) => canvas.getContext('2d')),
    filter(Boolean),
    shareReplay(1)
  );
  private particles$ = combineLatest([this.canvas$, this.ctx$]).pipe(
    map(([canvas, ctx]) =>
      Array.from({ length: this.particles }).map(
        () => new Particle(canvas.width, canvas.height, ctx)
      )
    ),
    shareReplay(1)
  );
  private effect$: Observable<ReturnType<typeof setInterval> | null> =
    combineLatest([this.canvas$, this.ctx$, this.particles$]).pipe(
      map(([canvas, ctx, particles]) => {
        return setInterval(
          () =>
            requestAnimationFrame(() => {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.fillStyle = 'rgba(0, 0, 0, 0)';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              particles.forEach((particle) => particle.step());
            }),
          1000 / this.fps
        );
      }),
      startWith(null),
      scan((previous, current) => {
        if (previous) {
          clearInterval(previous);
        }
        return current;
      }),
      takeUntilDestroyed()
    );

  public effectSubscription = this.effect$.subscribe(console.log);
  public domRectSubscription = combineLatest([
    this.canvas$,
    this.domRect$
  ]).subscribe(([canvas, domRect]) => {
    canvas.width = domRect.width;
    canvas.height = domRect.height;
  });
}
