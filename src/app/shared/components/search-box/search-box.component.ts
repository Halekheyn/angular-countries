import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @ViewChild('txtInput')
  public searchInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();


  // emitValue(term: string) -> Otra opción,
  // ya no se rerquiere el @viewChild(),
  // para acceder al valor del elemento
  emitValue():void{
    const search = this.searchInput.nativeElement.value;
    this.onValue.emit(search);
  }
}
