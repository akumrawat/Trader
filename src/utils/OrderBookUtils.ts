export const getBids = (
  ordersBatch: number[][],
  currentBids: number[][],
): number[][] => {
  let newBids = currentBids;
  ordersBatch.forEach(order => {
    if (order !== undefined) {
      if (order[2] > 0) {
        const index = newBids.findIndex(ele => ele[0] === order[0]);
        if (index === -1) {
          newBids.push(order);
        } else {
          newBids[index] = order;
        }
      }
    }
  });
  newBids = newBids.filter(ele => ele[1] !== 0 && ele[0] !== undefined);
  newBids.sort(function (a, b) {
    return b[0] - a[0];
  });
  let bidsSum = 0;
  newBids.map(ele => {
    bidsSum = bidsSum + ele[2];
    ele[3] = bidsSum;
    return ele;
  });
  return newBids;
};

export const getAsks = (
  ordersBatch: number[][],
  currentAsks: number[][],
): number[][] => {
  let newAsks = currentAsks;
  ordersBatch.forEach(order => {
    if (order !== undefined) {
      if (order[2] < 0) {
        const index = newAsks.findIndex(ele => ele[0] === order[0]);
        if (index === -1) {
          newAsks.push(order);
        } else {
          newAsks[index] = order;
        }
      }
    }
  });
  newAsks = newAsks.filter(ele => ele[1] !== 0 && ele[0] !== undefined);
  newAsks.sort(function (a, b) {
    return a[0] - b[0];
  });
  let asksSum = 0;
  newAsks.map(ele => {
    asksSum = asksSum + ele[2];
    ele[3] = asksSum;
    return ele;
  });
  return newAsks;
};
