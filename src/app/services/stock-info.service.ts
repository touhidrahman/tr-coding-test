import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import { retry } from 'rxjs/operators'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { environment } from 'src/environments/environment'

import { StockInfo } from '../models/stock-info'

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

    getInfoForISIN(): Observable<StockInfo> {
        // if the connection fails, retry 3 times before throwing error
        return this.stockSocket.asObservable().pipe(retry(3))
    }

    stopDataStream(isin: string) {
        this.stockSocket.next({ unsubscribe: isin })
    }
}
