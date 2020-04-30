import {
  Component,
  ContentChild,
  Directive,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Observable, of } from 'rxjs';

@Directive({ selector: '[header]' })
export class HeaderDirective {}

@Directive({ selector: '[content]' })
export class ContentDirective {}

type Panel<T> = T & { id: number; isOpen: boolean };

@Component({
  selector: 'app-smart-list',
  templateUrl: './smart-list.component.html',
  styleUrls: ['./smart-list.component.scss'],
})
export class SmartListComponent<T> implements OnInit {
  @Input()
  items: Observable<T[]> = of([]);

  private currentItems: Panel<T>[] = [];

  @ContentChild(HeaderDirective, { read: TemplateRef, static: true })
  headerTemplate: TemplateRef<any>;

  @ContentChild(ContentDirective, { read: TemplateRef, static: true })
  contentTemplate: TemplateRef<any>;

  constructor() {}

  ngOnInit() {
    this.items.subscribe((items) => {
      console.log('YAAAA ' + items.length);
      this.currentItems = items.map((item, index) => {
        const newItem = item as Panel<T>;
        newItem.id = index;
        newItem.isOpen = true;
        return newItem;
      });
    });
  }

  toggle(index: number) {
    this.currentItems[index].isOpen = !this.currentItems[index].isOpen;
  }
}
