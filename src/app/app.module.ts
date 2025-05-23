import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonsterComponent } from './components/monster/monster.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModalComponent } from './components/modal/modal.component';
import { DarknessCounterComponent } from './components/darkness-counter/darkness-counter.component';
import { LifeTabComponent } from './components/life-tab/life-tab.component';
import { LifeBarComponent } from './components/life-bar/life-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MonsterComponent,
    DashboardComponent,
    ModalComponent,
    DarknessCounterComponent,
    LifeTabComponent,
    LifeBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
