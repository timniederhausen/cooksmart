import {
  Component,
  ContentChild,
  Directive, Input,
  OnInit,
  TemplateRef,
} from '@angular/core';

@Directive({ selector: '[item]' })
export class ItemDirective {}

@Component({
  selector: 'app-smart-list',
  templateUrl: './smart-list.component.html',
  styleUrls: ['./smart-list.component.scss'],
})
export class SmartListComponent<T> implements OnInit {
  @Input()
  items: T[] = [];

  @ContentChild(ItemDirective, { read: TemplateRef, static: true })
  itemTemplate;

  constructor() {}

  ngOnInit() {}
}
