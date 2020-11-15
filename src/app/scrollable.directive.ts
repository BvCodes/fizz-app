import { Directive, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter();

  constructor(public element: ElementRef) { }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    try {
      const top = event.target.scrollTop;
      const height = this.element.nativeElement.scrollHeight;
      const offset = this.element.nativeElement.offsetHeight;

      // bottom event
      if (top > height - offset - 1) {
        this.scrollPosition.emit('botttom')
      }

      // top event
      if (top === 0) {
        this.scrollPosition.emit('top')
      }
    } catch (err) {}
  } 


}
