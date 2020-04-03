import { Injectable } from '@angular/core'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { StockInfo } from '../models/stock-info'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class StockInfoService {
    private stockSocket: WebSocketSubject<StockInfo | any>

    constructor() {
        this.stockSocket = webSocket(environment.socketUrl)
    }

    requestInfoForISIN(isin: string) {
        this.stockSocket.next({ subscribe: 'DE000BASF111' })
    }

    getInfoForISIN(isin: string) {
        return this.stockSocket.asObservable()
    }
}
