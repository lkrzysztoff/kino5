import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numberMaxLength]'
})
export class NumberMaxLengthDirective {
  @Input() numberMaxLength!: number;

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const currentValue: string = this.el.nativeElement.value;
    const newValue: string = currentValue.replace(/[^0-9]/g, '').substr(0, this.numberMaxLength);
    if (currentValue !== newValue) {
      event.preventDefault();
      this.el.nativeElement.value = newValue;
      this.el.nativeElement.dispatchEvent(new Event('input'));
    }
  }
}