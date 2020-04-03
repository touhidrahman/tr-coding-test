import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

import { ToastrService } from 'ngx-toastr'
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { StockInfo } from 'src/app/models/stock-info'
import { StockInfoService } from 'src/app/services/stock-info.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    // predefined list of instruments
    instruments: string[] = ['DE000BASF111', 'DE000BASF112', 'DE000BASF113']
    selectedInstrument: string
    selectedInstrumentInfo$: Observable<StockInfo>

    newISIN: FormControl

    constructor(
        private stockInfoService: StockInfoService,
        private toastr: ToastrService,
    ) {
        this.newISIN = new FormControl(
            null,
            Validators.compose([Validators.required, Validators.minLength(12)]),
        )
    }

    ngOnInit(): void {
        this.selectedInstrumentInfo$ = this.stockInfoService
            .getInfoForISIN()
            .pipe(
                catchError((err) => {
                    // on WS connection error (after retrying 3 times), show user a toaster
                    this.toastr.error(
                        'There was an error connecting to the server.',
                        'Connection error!',
                    )
                    return of(err)
                }),
            )
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
            } else {
                // in case a duplicate ISIN, show a toast to user
                this.toastr.info('The ISIN already exists.')
            }
            this.newISIN.reset()
        }
    }

    deleteInstrument(isin: string) {
        const index = this.instruments.indexOf(isin)
        this.instruments.splice(index, 1)
        this.stop(isin)
        this.selectedInstrument = null
        this.toastr.success('Instrument deleted')
    }
}
