function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index');
}

function getTradeData() {
  const folderId = "1AYrP_zimsDEZl4KVEPlKQZcIyQWsYRK0"; // Replace with your Google Drive folder ID
  const files = DriveApp.getFolderById(folderId).getFilesByName("tradebook-data.csv");
  
  if (!files.hasNext()) {
    return [];
  }
  
  const file = files.next();
  const csvContent = file.getBlob().getDataAsString();
  const csvData = Utilities.parseCsv(csvContent, ',');
  
  // Remove header
  csvData.shift();
  return csvData;
}

function searchStock(symbol, startDate, endDate) {
  const trades = getTradeData();
  let results = trades.filter(row => row[0].toUpperCase() === symbol.toUpperCase());
  
  // Date filter if provided
  if (startDate || endDate) {
    results = results.filter(row => {
      const [d, m, y] = row[2].split('/');
      const tradeDate = new Date(`${y}-${m}-${d}`);
      let afterStart = true, beforeEnd = true;
      if (startDate) {
        const [sd, sm, sy] = startDate.split('-');
        const sDate = new Date(`${sy}-${sm}-${sd}`);
        afterStart = tradeDate >= sDate;
      }
      if (endDate) {
        const [ed, em, ey] = endDate.split('-');
        const eDate = new Date(`${ey}-${em}-${ed}`);
        beforeEnd = tradeDate <= eDate;
      }
      return afterStart && beforeEnd;
    });
  }
  
  let totalBuy = 0;
  let totalSell = 0;
  let buyQuantity = 0;
  let sellQuantity = 0;
  
  results.forEach(trade => {
    const quantity = parseInt(trade[8]);
    const price = parseFloat(trade[9]);
    const total = quantity * price;
    
    if (trade[6].toLowerCase() === 'buy') {
      totalBuy += total;
      buyQuantity += quantity;
    } else {
      totalSell += total;
      sellQuantity += quantity;
    }
  });
  
  const response = {
    symbol: symbol,
    totalTrades: results.length,
    buyQuantity: buyQuantity,
    sellQuantity: sellQuantity,
    totalBuyValue: totalBuy,
    totalSellValue: totalSell,
    netPosition: buyQuantity - sellQuantity,
    netValue: totalSell - totalBuy,
    trades: results.map(row => ({
      date: row[2],
      type: row[6],
      quantity: parseInt(row[8]),
      price: parseFloat(row[9])
    }))
  };
  
  return response;
}

function listAllScripts(sortBy) {
  const trades = getTradeData();
  const summary = {};
  const order = [];
  trades.forEach(trade => {
    const symbol = trade[0];
    if (!summary[symbol]) {
      summary[symbol] = { buy: 0, sell: 0 };
      order.push(symbol);
    }
    const quantity = parseInt(trade[8]);
    const price = parseFloat(trade[9]);
    const total = quantity * price;
    if (trade[6].toLowerCase() === 'buy') {
      summary[symbol].buy += total;
    } else {
      summary[symbol].sell += total;
    }
  });
  let result = Object.entries(summary).map(([symbol, data]) => ({
    symbol,
    pnl: data.sell - data.buy
  }));
  if (sortBy === 'alpha') {
    result.sort((a, b) => a.symbol.localeCompare(b.symbol));
  } else if (sortBy === 'pnl') {
    result.sort((a, b) => b.pnl - a.pnl);
  } else if (sortBy === 'order') {
    result.sort((a, b) => order.indexOf(a.symbol) - order.indexOf(b.symbol));
  }
  return result;
}

function getAllSymbols() {
  const trades = getTradeData();
  const symbols = {};
  trades.forEach(row => { symbols[row[0].toUpperCase()] = true; });
  return Object.keys(symbols).sort();
}
