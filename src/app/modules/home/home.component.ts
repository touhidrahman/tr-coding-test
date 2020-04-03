import { Component, OnInit } from '@angular/core'
import { StockInfoService } from 'src/app/services/stock-info.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(private stockInfoService: StockInfoService) {}

    ngOnInit(): void {
        this.stockInfoService.requestInfoForISIN('DE000BASF111')
        this.stockInfoService
            .getInfoForISIN('DE000BASF111')
            .subscribe((data) => {
                console.log('TCL: data :', data) // ! remove
            })
    }

    stop() {
        this.stockInfoService.stopDataStream('DE000BASF111')
    }
}
