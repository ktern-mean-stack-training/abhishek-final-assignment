import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { FirstpageComponent } from './firstpage/firstpage.component';

const routes: Routes = [
{
  path: '',redirectTo:'firstpage',pathMatch:'full'
},

{
  path: "firstpage",
  component: FirstpageComponent
},

{
  path:"home",
  component: HomeComponent
},
{
  path:"about",
  component: AboutComponent
},
{
  path: "**",
  component: ErrorpageComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
