///<reference path="./enums/ticket-codes"/>
///<reference path="./enums/order-codes"/>
///<reference path="./enums/security-types"/>
///<reference path="./enums/currency-codes"/>
///<reference path="./trader-net-types"/>

module tn {

    export function formatPutOrder(data:IPutOrderData):tn.ITraderNetPutOrderData {
        return {
            instr_name: getCodes([data.ticket])[0],
            action_id: data.action,
            order_type_id: data.orderType,
            curr: CurrencyCodes[data.currency],
            limit_price: data.limitPrice,
            stop_price: data.stopPrice,
            qty: data.quantity,
            aon: data.allOrNothing ? 1 : 0,
            expiration_id: data.expiration,
            submit_ch_c: 1,
            message_id: 0,
            replace_order_id: 0,
            groupPortfolioName: data.groupPortfolio,
            userOrderId: data.userOrderId
        };
    }

    export function mapPortfolio(servicePortfolio:any):tn.ITraderNetPortfolio {

        return {
            key: servicePortfolio.key,
            accounts: servicePortfolio.acc.map(mapAccount),
            positions: servicePortfolio.pos.map(mapPosition)
        }
    }

    function mapOrderBookItem(ticket: string, action: tn.BookOrderActions, orderBookItem:any):tn.IBookOrder {
        return {
            index: orderBookItem.k,
            ticket: tn.TicketCodes[ticket],
            action: action,
            price: orderBookItem.p,
            quantity: orderBookItem.q,
            orderAction: orderBookItem.s == "S" ? tn.OrderActionTypes.Sell : tn.OrderActionTypes.Buy
        };
    }

    export function mapOrderBook(orderBook:any):Array<tn.IBookOrder> {
        //https://github.com/tradernet/tn.api#notifyOrderBook
        var res = orderBook.dom.map ((m: any) => {
            var ins = m.ins.map(x =>
                mapOrderBookItem(m.i, tn.BookOrderActions.insert, x)
            );
            var upd = m.upd.map(x =>
                    mapOrderBookItem(m.i, tn.BookOrderActions.update, x)
            );
            var del = m.del.map(x =>
                    mapOrderBookItem(m.i, tn.BookOrderActions.remove, x)
            );
            return ins.concat(del).concat(upd);
        });
        return  [].concat.apply([],res);
    }

    export function mapOrder(tnOrder:any):tn.IOrder {
        return <tn.IOrder>{
            id: tnOrder.id,
            date: tnOrder.date,
            status: tnOrder.stat,
            statusOriginal: tnOrder.stat_orig,
            statusDate: tnOrder.stat_d,
            security: <any>TicketCodes[tnOrder.instr],
            securityName: tnOrder.name,
            securityName2: tnOrder.name2,
            oper: tnOrder.oper,
            type: tnOrder.type,
            currency: <any>CurrencyCodes[tnOrder.cur],
            price: tnOrder.p,
            stopPrice: tnOrder.stop,
            quantity: tnOrder.q,
            allOrNothing: !!tnOrder.aon,
            expiration: <any>OrderExpirationTypes[tnOrder.exp],
            rep: tnOrder.rep,//???
            fv: tnOrder.fv,
            stat_prev: tnOrder.stat_prev,
            userOrderId: tnOrder.userOrderId
        }
    }

    function mapAccount(serviceAccount:any):tn.ITraderNetAccount {
        return {
            availableAmount: serviceAccount.s,
            currency: <any>CurrencyCodes[serviceAccount.curr],
            currencyRate: serviceAccount.currval,
            forecastIn: serviceAccount.forecast_in,
            forecastOut: serviceAccount.forecast_out
        }
    }

    function mapPosition(servicePos:any):tn.ITraderNetPosition {
        return {
            security: <any>TicketCodes[servicePos.i],
            securityType: servicePos.t,
            securityKind: servicePos.k,
            price: servicePos.s,
            quantity: servicePos.q,
            currency: <any>CurrencyCodes[servicePos.curr],
            currencyRate: servicePos.currval,
            securityName: servicePos.name,
            securityName2: servicePos.name2,
            openPrice: servicePos.open_bal,
            marketPrice: servicePos.mkt_price
        }
    }

    export function mapQuotes(serviceQuote:any):tn.ITraderNetQuote {
        return {
            security: <any>TicketCodes[serviceQuote.c],
            ticket: <string>serviceQuote.c,
            latestPrice: serviceQuote.ltp,
            lot: serviceQuote.x_lot,
            ask: serviceQuote.bap,
            bid: serviceQuote.bbp
        };
    }
}


