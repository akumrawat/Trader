import {useEffect, useRef, useState} from 'react';
import {URLs} from '../../constants/urls';
import {OHLCModel, WebSocketServiceType} from '../../types/OrderBookModel';
import WebSocketService from '../../utils/WebSocketService';

function handleOHLCMessage(event: WebSocketMessageEvent): OHLCModel[] | null {
  if (event.data !== undefined) {
    console.log(event.data);
    const ohlcResponse = JSON.parse(event.data)[1];
    if (ohlcResponse !== undefined && Array.isArray(ohlcResponse)) {
      if (ohlcResponse !== undefined && Array.isArray(ohlcResponse[0])) {
        let ohlcBatch: OHLCModel[] = ohlcResponse.map((ele: number[]) => {
          let model: OHLCModel = {
            x: new Date(ele[0]),
            open: ele[1],
            close: ele[2],
            high: ele[3],
            low: ele[4],
          };
          return model;
        });
        return ohlcBatch;
      } else {
        return [
          {
            x: new Date(ohlcResponse[0]),
            open: ohlcResponse[1],
            close: ohlcResponse[2],
            high: ohlcResponse[3],
            low: ohlcResponse[4],
          },
        ];
      }
    }
    return null;
  }
  return null;
}

const ohlcSocketConfig: WebSocketServiceType = {
  message: JSON.stringify({
    event: 'subscribe',
    channel: 'candles',
    key: 'trade:1D:tBTCUSD',
  }),
  config: JSON.stringify({}),
  socketURL: URLs.webSocketURL,
  handler: handleOHLCMessage,
};

const useOHLC = (): [OHLCModel[], () => void, () => void] => {
  const [orders, setOrders] = useState<OHLCModel[]>([]);
  const webSocketService = useRef<WebSocketService>(new WebSocketService());
  const [ordersBatch, setOrdersBatch] = useState<any>([]);
  useEffect(() => {
    const orderssBatch = ohlcSocketConfig.handler(ordersBatch);

    if (orderssBatch) {
      const newOrdersBatch = [...orders, ...orderssBatch];
      setOrders(newOrdersBatch);
    }
  }, [ordersBatch]);

  const onPressOpen = () => {
    webSocketService.current.initSocket(ohlcSocketConfig);
    webSocketService.current.onMessage(event => {
      setOrdersBatch(event);
    });
  };

  const onPressClose = () => {
    webSocketService.current.closeWebSocket();
  };

  return [orders, onPressClose, onPressOpen];
};

export default useOHLC;
