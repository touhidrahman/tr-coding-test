import { Injectable } from '@angular/core'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { StockInfo } from '../models/stock-info'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class StockInfoService {
    private stockSocket: WebSocketSubject<StockInfo | any>

    constructor() {
        this.stockSocket = webSocket(environment.socketUrl)
    }

    requestInfoForISIN(isin: string) {
        this.stockSocket.next({ subscribe: isin })
    }

    getInfoForISIN(isin: string): Observable<StockInfo> {
        return this.stockSocket.asObservable().pipe()
    }

    stopDataStream(isin: string) {
        this.stockSocket.next({ unsubscribe: isin })
    }
}
