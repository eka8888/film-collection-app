import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
    standalone: true
})
export class Autofocus implements AfterViewInit  {
  
    private el = inject(ElementRef<HTMLInputElement>);

  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
}
