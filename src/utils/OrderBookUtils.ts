import {OrderBookModel} from '../types/OrderBookModel';

export const getBids = (
  ordersBatch: OrderBookModel[],
  currentBids: OrderBookModel[],
): OrderBookModel[] => {
  let newBids = currentBids;
  ordersBatch.forEach(order => {
    if (order !== undefined) {
      if (order.amount > 0) {
        const index = newBids.findIndex(ele => ele.price === order.price);
        if (index === -1) {
          newBids.push(order);
        } else {
          newBids[index] = order;
        }
      }
    }
  });
  newBids = newBids.filter(ele => ele.count !== 0 && ele.price !== undefined);
  newBids.sort(function (a, b) {
    return b.price - a.price;
  });
  let bidsSum = 0;
  newBids.map(ele => {
    bidsSum = bidsSum + ele.amount;
    ele.totalAmount = bidsSum;
    return ele;
  });
  return newBids;
};

export const getAsks = (
  ordersBatch: OrderBookModel[],
  currentAsks: OrderBookModel[],
): OrderBookModel[] => {
  let newAsks = currentAsks;
  ordersBatch.forEach(order => {
    if (order !== undefined) {
      if (order.amount < 0) {
        const index = newAsks.findIndex(ele => ele.price === order.price);
        if (index === -1) {
          newAsks.push(order);
        } else {
          newAsks[index] = order;
        }
      }
    }
  });
  newAsks = newAsks.filter(ele => ele.count !== 0 && ele.price !== undefined);
  newAsks.sort(function (a, b) {
    return a.price - b.price;
  });
  let asksSum = 0;
  newAsks.map(ele => {
    asksSum = asksSum + ele.amount;
    ele.totalAmount = asksSum;
    return ele;
  });
  return newAsks;
};
