import { Component, OnInit } from '@angular/core'
import { StockInfoService } from 'src/app/services/stock-info.service'
import { StockInfo } from 'src/app/models/stock-info'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    instruments: string[] = ['DE000BASF111', 'DE000BASF112', 'DE000BASF113']
    selectedInstrument: string
    selectedInstrumentInfo$: Observable<StockInfo>

    constructor(private stockInfoService: StockInfoService) {}

    ngOnInit(): void {
        this.selectedInstrumentInfo$ = this.stockInfoService.getInfoForISIN()
    }

    onSelectISIN(isin: string) {
        this.stockInfoService.stopDataStream(this.selectedInstrument)
        this.selectedInstrument = isin
        this.stockInfoService.requestInfoForISIN(isin)
    }

    stop(isin: string) {
        this.stockInfoService.stopDataStream(isin)
    }
}
