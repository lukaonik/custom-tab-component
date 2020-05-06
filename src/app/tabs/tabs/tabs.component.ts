import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  AfterContentChecked,
} from "@angular/core";
import { TabItemComponent } from "../tab-item/tab-item.component";
import { Observable, Subscription } from "rxjs";
import { startWith, map, take, tap, delay } from "rxjs/operators";

@Component({
  selector: "app-tabs",
  template: `
    <div class="tabs-header">
      <div
        class="tab-label"
        (click)="selectTab(item)"
        [class.active]="activeTab === item"
        *ngFor="let item of tabItems$ | async"
      >
        <ng-container *ngIf="item.labelComponent">
          <ng-container *ngTemplateOutlet="item.labelComponent.labelContent">
          </ng-container>
        </ng-container>

        <ng-container *ngIf="!item.labelComponent">
          {{ item.label }}
        </ng-container>
      </div>
    </div>
    <div class="tabs-body">
      <ng-container *ngIf="activeTab && activeTab.bodyComponent">
        <ng-container *ngTemplateOutlet="activeTab.bodyComponent.bodyContent">
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .tabs-header {
        display: flex;
      }
      .active {
        color: red;
      }

      .tab-label {
        border: 1px dashed black;
        padding: 25px;
        margin: 0 10px;
      }
    `,
  ],
})
export class TabsComponent implements AfterContentInit, AfterContentChecked {
  @ContentChildren(TabItemComponent)
  tabs: QueryList<TabItemComponent>;

  tabItems$: Observable<TabItemComponent[]>;

  activeTab: TabItemComponent;

  tabSubscription = new Subscription();

  constructor() {}

  ngAfterContentInit(): void {
    this.tabItems$ = this.tabs.changes
      .pipe(startWith(""))
      .pipe(delay(0))
      .pipe(map(() => this.tabs.toArray()));
  }

  ngAfterContentChecked() {
    //choose the default tab
    // we need to wait for a next VM turn,
    // because Tab item content, will not be initialized yet
    if (!this.activeTab) {
      Promise.resolve().then(() => {
        this.activeTab = this.tabs.first;
      });
    }
  }

  selectTab(tabItem: TabItemComponent) {
    if (this.activeTab === tabItem) {
      return;
    }

    if (this.activeTab) {
      this.activeTab.isActive = false;
      
    }

    this.activeTab = tabItem;

    tabItem.isActive = true;
  }
}
