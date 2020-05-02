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
import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('collapse', [
      state('open', style({
        opacity: '1'
      })),
      state('closed', style({
        opacity: '0',
        display: 'none',
      })),
      transition('closed => open', animate('100ms ease-in')),
      transition('open => closed', animate('100ms ease-out'))
    ])
  ]
})
export class AppComponent {
  title = 'cooksmart';

  isNavbarCollapsed = true;
  _isNavbarCollapsedAnim = 'closed';

  veil = document.createElement('div');

  toggleNavbar(event: MouseEvent) {
    if (this.isNavbarCollapsed) {
      this._isNavbarCollapsedAnim = 'open';
      this.isNavbarCollapsed = false;
    } else {
      this.closeNavbar();
    }
  }

  closeNavbar() {
    this._isNavbarCollapsedAnim = 'closed';
    this.isNavbarCollapsed = true;
  }

  get isNavbarCollapsedAnim(): string {
    return this._isNavbarCollapsedAnim;
  }
}
