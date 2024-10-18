import { Component, ViewEncapsulation } from '@angular/core';
import { AnimationItem } from 'lottie-web';

@Component({
    selector     : 'home',
    standalone   : false,
    templateUrl  : './home.component.html',
    styleUrls    :['./home.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
