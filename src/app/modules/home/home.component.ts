import { Component, OnInit } from '@angular/core'
import { StockInfoService } from 'src/app/services/stock-info.service'
import { StockInfo } from 'src/app/models/stock-info'
import { Observable } from 'rxjs'
import { FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    instruments: string[] = ['DE000BASF111', 'DE000BASF112', 'DE000BASF113']
    selectedInstrument: string
    selectedInstrumentInfo$: Observable<StockInfo>

    newISIN: FormControl

    constructor(private stockInfoService: StockInfoService) {
        this.newISIN = new FormControl(
            null,
            Validators.compose([Validators.required, Validators.minLength(12)]),
        )
    }

    ngOnInit(): void {
        this.selectedInstrumentInfo$ = this.stockInfoService.getInfoForISIN()
    }

    onSelectISIN(isin: string) {
        this.stop(this.selectedInstrument)
        this.selectedInstrument = isin
        this.stockInfoService.requestInfoForISIN(isin)
    }

    stop(isin: string) {
        this.stockInfoService.stopDataStream(isin)
    }

    addInstrument() {
        if (this.newISIN.invalid) {
            this.newISIN.markAllAsTouched()
            return
        }

        if (this.newISIN.valid) {
            const exists = this.instruments.indexOf(this.newISIN.value) > -1
            if (!exists) {
                this.instruments.push(this.newISIN.value)
            }
            this.newISIN.reset()
        }
    }

    deleteInstrument(isin: string) {
        const index = this.instruments.indexOf(isin)
        this.instruments.splice(index, 1)
        this.stop(isin)
        this.selectedInstrument = null
    }
}
