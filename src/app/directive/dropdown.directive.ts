import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  private isOpen = false;
  constructor(
    private _element : ElementRef,
    private _rendrer : Renderer2
  ) { }


  //we click the dropdown
  @HostListener('click') toggleDropdown(){
    this.isOpen = !this.isOpen;
    if(this.isOpen){
      this._rendrer.addClass(this._element.nativeElement.nextElementSibling,'show')
    }else{
      this._rendrer.removeClass(this._element.nativeElement.nextElementSibling,'show')
    }
  }

  //if we click dropdown and click outside
  @HostListener('document:click', ['$event.target']) onclickoutside(targetElement:HTMLElement){

    const clickinside =this._element.nativeElement.contains(targetElement);

    if(!clickinside){
      this.isOpen = false;
      this._rendrer.removeClass(this._element.nativeElement.nextElementSibling,'show')
    }
  }

  //if we click dropdown and escape

  @HostListener('document:keydown.escape',['$event']) onescape(event:KeyboardEvent){
    this.isOpen = false;
    this._rendrer.removeClass(this._element.nativeElement.nextElementSibling,'show')
  }
}
