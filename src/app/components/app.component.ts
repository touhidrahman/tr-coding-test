import { Component, OnInit } from '@angular/core'
import { User } from '../models/user'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'tr-coding-test'

    constructor() {}

    ngOnInit() {}
}
