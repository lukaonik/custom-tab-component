import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { TabsModule } from "./tabs/tabs.module";

@NgModule({
  declarations: [AppComponent],
  imports: [TabsModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
