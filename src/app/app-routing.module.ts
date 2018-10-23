import { NgModule } from '../../node_modules/@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ExtensiveForecastComponent } from './main/extensive-forecast/extensive-forecast.component';

const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', component: MainComponent },
    { path: 'main/:id', component: ExtensiveForecastComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}

