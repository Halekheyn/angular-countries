import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @ViewChild('txtInput')
  public searchInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string>= new EventEmitter()

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe( value => {
      console.log('debouncer value', value);
      this.onDebounce.emit(value)
    })
  }

  // Se llama cuando la instancia es destruida,
  // cada vez que salgo de la página
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
  }

  // emitValue(term: string) -> Otra opción,
  // ya no se rerquiere el @viewChild(),
  // para acceder al valor del elemento
  emitValue():void{
    const search = this.searchInput.nativeElement.value;
    this.onValue.emit(search);
  }

  onKeyPress( searchTerm: string ){

    console.log(searchTerm)
    this.debouncer.next( searchTerm );

  }
}
