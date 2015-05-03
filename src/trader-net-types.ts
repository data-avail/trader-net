///<reference path="./enums/ticket-codes"/>
///<reference path="./enums/order-codes"/>
///<reference path="./enums/security-types"/>
///<reference path="./enums/currency-codes"/>

module tn {

    export interface ITraderNetAuth {
        apiKey: string
        securityKey: string
    }

    export interface ITraderNetOpts {
        onPortfolio?: (portfolio:ITraderNetPortfolio) => void
        onPortfolioOnce?: (portfolio:ITraderNetPortfolio) => void
        onOrders?: (orders:Array<IOrder>) => void
        onOrdersOnce?: (orders:Array<IOrder>) => void
        onQuotes?: (quotes:Array<ITraderNetQuote>) => void
        onQuotesOnce?: (quotes:Array<ITraderNetQuote>) => void
        onOrderBook?: (orders:Array<IBookOrder>) => void
    }

    export enum BookOrderActions {insert, update, remove}

    export interface IBookOrder {
        index: number
        action: BookOrderActions
        ticket: TicketCodes
        price: number
        quantity: number
        orderAction: OrderActionTypes
    }

    export interface IPutOrderData {
        ticket: TicketCodes|string
        action: OrderActionTypes
        orderType: OrderTypes
        currency: CurrencyCodes
        quantity: number
        limitPrice?: number
        stopPrice?: number
        allOrNothing?: boolean
        expiration?: OrderExpirationTypes
        groupPortfolio?: number
        userOrderId?: number
    }

    export interface IOrder {
        id: number
        date: string
        status: OrderStatusCodes//???
        statusOriginal: OrderStatusCodes//???
        statusDate: string
        security: TicketCodes
        securityName: string
        securityName2: string
        oper: number//???
        type: number//???
        currency: CurrencyCodes
        price: number
        stopPrice: number
        quantity: number
        allOrNothing: boolean
        expiration: OrderExpirationTypes
        rep: string//???
        fv: string
        stat_prev: number
        userOrderId: string
    }

    export interface ITraderNetAccount {
        ///????????? ????????
        availableAmount: number
        ///?????? ?????
        currency: CurrencyCodes
        ///???? ?????? ?????
        currencyRate: number
        forecastIn: number
        forecastOut: number
    }

    export interface ITraderNetPosition {
        ///????? ??????
        security: TicketCodes
        ///??? ?????? ???
        securityType: SecurityType
        ///??? ?????? ???
        securityKind: SecurityKind
        //?????????
        price: number
        ///??????????
        quantity: number
        ///??????
        currency: CurrencyCodes
        ///???? ??????
        currencyRate: number
        ///???????????? ??????
        securityName: string
        ///?????????????? ???????????? ??????
        securityName2: string
        ///???? ????????
        openPrice : number
        ///???????? ????
        marketPrice: number
        /*
         //???
         vm: string
         //???
         go: number
         //???
         profit_close: number
         //???
         acc_pos_id: number
         //???
         trade: Array<{}>
         */
    }

    export interface ITraderNetPortfolio {
        ///???? ????????? ???????? (?????, ???????????? ?????? ????????)
        key: string
        ///?????? ?????? ???????
        accounts: Array<ITraderNetAccount>
        ///?????? ??????? ???????
        positions: Array<ITraderNetPosition>
    }

    export interface ITraderNetAuthResult {
        login: string
        mode: string
        trade: boolean
    }

    export interface IPutOrderResult {
        orderId: number
    }

    export interface ITraderNetPutOrderData {
        instr_name: string
        action_id: number
        order_type_id: number
        curr: string
        limit_price: number
        stop_price: number
        qty: number
        aon: number
        expiration_id: number
        submit_ch_c: number
        message_id: number
        replace_order_id: number
        groupPortfolioName: number
        userOrderId: number
    }

    export interface ITraderNetQuote {

        ///????? ??????
        security: TicketCodes
        ticket: string
        //???? ????????? ??????
        latestPrice : number
        /*
         n	?????????? ????? ?????????. ?????? ????? ????? ???? ?????????
         c	?????
         mrg	??????? ??????????????. ???? ?????? ???????????, ???????? ?????? 'M'
         ltr	????? ????????? ??????
         kind	??? ?????? (1 - Common ????????????, 2 - Pref ?????????????????, 3 - Percent ??????????, 4 - Discount ??????????, 5 - Delivery ???????????, 6 - Rated ?????????, 7 - Interval ????????????)
         type	??? ?????? (1 - ?????, 2 - ?????????, 3 - ????????)
         name	???????? ??????
         name2	????????? ???????? ??????
         bbp	?????? ???
         bbc	??????????? ????????? ??????? ???? ('' - ?? ?????????, 'D' - ????, 'U' - ?????)
         bbs	?????????? (????) ??????? ????
         bbf	?????(?) ??????? ????
         bap	?????? ???
         bac	??????????? ????????? ??????? ???? ('' - ?? ?????????, 'D' - ????, 'U' - ?????)
         bas	?????????? (????) ??????? ????
         baf	?????(?) ??????? ????
         pp	???? ??????????? ????????
         op	???? ???????? ? ??????? ???????? ??????
         ltp	???? ????????? ??????
         lts	?????????? (????) ????????? ??????
         ltt	????? ????????? ??????
         chg	????????? ???? ????????? ?????? ? ??????? ???????????? ???? ???????? ?????????? ???????? ??????
         pcp	????????? ? ????????? ???????????? ???? ???????? ?????????? ???????? ??????
         ltc	??????????? ????????? ???? ????????? ?????? ('' - ?? ??????????, 'D' - ????, 'U' - ?????)
         mintp	??????????? ???? ?????? ?? ????
         maxtp	???????????? ???? ?????? ?? ????
         vol	????? ?????? ?? ???? ? ??????
         vlt	????? ?????? ?? ???? ? ??????
         yld	?????????? ? ????????? (??? ?????????)
         acd	??????????? ???????? ????? (???)
         fv	???????
         mtd	???? ?????????
         cpn	????? ? ??????
         cpp	???????? ?????? (? ????)
         ncd	???? ?????????? ??????
         ncp	???? ?????????? ??????
         dpd	?? ???????
         dps	?? ???????
         trades	?????????? ??????
         min_step	??????????? ??? ????
         step_price	??? ????
         p5	???? 5 ???? ?????
         chg5	????????? ???? ?? 5 ????
         p22	???? 22 ??? ?????
         chg22	????????? ???? ?? 22 ???
         p110	???? 110 ???? ?????
         chg110	????????? ???? ?? 110 ????
         p220	???? 220 ???? ?????
         chg220	????????? ???? ?? 220 ????
         x_dsc1	???????
         x_dsc2	?? ????????????
         x_dsc3	?? ????????????
         x_descr	????????
         x_curr	??????
         x_short	????? ?? ??????? ??????
         x_lot	??????????? ???
         x_currVal	???? ?????? ?? ????????? ? ?????
         x_min	??????? ?? (??????)
         x_max	???????? ?? (??????)
         x_istrade	???? ?? ?? ?????? ??????
         */
    }
}
