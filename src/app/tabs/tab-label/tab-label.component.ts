import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-tab-label",
  template: "<ng-template><ng-content></ng-content></ng-template>  ",
})
export class TabLabelComponent implements OnInit {
  @ViewChild(TemplateRef)
  labelContent: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}
}
