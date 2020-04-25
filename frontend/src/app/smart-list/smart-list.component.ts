import { Component, ContentChild, Directive, OnInit, TemplateRef } from '@angular/core';

@Directive({selector: 'item-directive'})
export class ItemDirective {

}

@Component({
  selector: 'app-smart-list',
  styleUrls: ['./smart-list.component.scss'],
  template: `
    <div>
      <ng-container *ngFor="let item of items">
        <ng-container *ngTemplateOutlet="listItemTemplate"></ng-container>
      </ng-container>
    </div>
`
})

export class SmartListComponent implements OnInit {
  items = [];
  @ContentChild(ItemDirective, {read: TemplateRef, static:false}) listItemTemplate;

  constructor() { }

  ngOnInit() {
  }

}
