import {
  Component,
  ContentChild,
  Directive, Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {Observable} from "rxjs";

@Directive({ selector: '[item]' })
export class ItemDirective {}

@Component({
  selector: 'app-smart-list',
  templateUrl: './smart-list.component.html',
  styleUrls: ['./smart-list.component.scss'],
})
export class SmartListComponent<T> implements OnInit {
  @Input()
  items: T[] | Observable<T[]> = [];

  @ContentChild(ItemDirective, { read: TemplateRef, static: true })
  itemTemplate;

  constructor() {}

  ngOnInit() {}

  isAsync() { return this.items instanceof Observable; }
}
