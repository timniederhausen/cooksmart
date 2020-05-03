// Copyright 2020 Felix Burk, Tim Niederhausen
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
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

type Panel<T> = T & { index: number; isOpen: boolean };

@Component({
  selector: 'app-smart-list',
  templateUrl: './smart-list.component.html',
  styleUrls: ['./smart-list.component.scss'],
})
export class SmartListComponent<T> implements OnInit {
  @Input()
  items: Observable<T[]> = of([]);

  currentItems: Panel<T>[] = [];

  @ContentChild(HeaderDirective, { read: TemplateRef, static: true })
  headerTemplate: TemplateRef<any>;

  @ContentChild(ContentDirective, { read: TemplateRef, static: true })
  contentTemplate: TemplateRef<any>;

  constructor() {}

  ngOnInit() {
    this.items.subscribe((items) => {
      this.currentItems = items.map((item, index) => {
        const newItem = item as Panel<T>;
        newItem.index = index;
        newItem.isOpen = false;
        return newItem;
      });
    });
  }

  toggle(index: number) {
    this.currentItems[index].isOpen = !this.currentItems[index].isOpen;
  }
}
