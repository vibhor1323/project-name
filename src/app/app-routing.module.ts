import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ItemPageComponent } from "./item-page/item-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";

const routes:Routes =[
    {
     path:'',component:LandingPageComponent
    },
    {
        path:'item',component:ItemPageComponent
    }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],

    exports:[RouterModule]
})
export class AppRoutingModule{}
export const RoutingComponents= [LandingPageComponent,ItemPageComponent]