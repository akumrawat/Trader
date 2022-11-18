import {OrderBookModel} from '../types/OrderBookModel';

const updateSum = (total: number, ele: OrderBookModel): number => {
  ele.totalAmount = total;
  return total + ele.amount;
};

export const getOrders = (
  newOrdersBatch: OrderBookModel[],
  currentOrdersBatch: OrderBookModel[],
  comparator: 1 | -1,
): OrderBookModel[] => {
  let newBatch = Array.from(currentOrdersBatch);
  newOrdersBatch.forEach(order => {
    if (order) {
      if (order.amount * comparator > 0) {
        const index = newBatch.findIndex(ele => ele.price === order.price);
        if (index === -1) {
          newBatch.push(order);
        } else {
          newBatch[index] = order;
        }
      }
    }
  });
  newBatch = newBatch.filter(ele => ele.count !== 0 && ele.price !== undefined);
  newBatch.sort(function (a, b) {
    return b.price * comparator - a.price * comparator;
  });

  newBatch.reduce(updateSum, 0);

  return newBatch;
};
