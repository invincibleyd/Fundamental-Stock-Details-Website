document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'KJRVKPYCDDFU2F85'; // Your API key here

    document.getElementById('fetchDataBtn').addEventListener('click', function () {
        const symbol = document.getElementById('stockSymbol').value.toUpperCase().trim();
        if (symbol) {
            fetchStockData(symbol);
        } else {
            alert('Please enter a valid stock symbol.');
        }
    });

    document.getElementById('categories').addEventListener('change', function () {
        const category = this.value;
        showCategory(category);
    });

    
});

let stockData = null;

function fetchStockData(symbol) {
    const apiKey = 'KJRVKPYCDDFU2F85'; // Your API key here
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch stock data.');
            }
            return response.json();
        })
        .then(data => {
            if (data.Note) {
                alert('API limit reached. Please try again later.');
                return;
            }
            if (!data.Symbol) {
                alert('Invalid stock symbol. Please try again.');
                return;
            }

            stockData = data;
            document.getElementById('categoryDropdown').style.display = 'block';
            showCategory('companyInfo');
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again.');
        });
}

function showCategory(category) {
    const data = getCategoryData(category, stockData);
    const stockDataDiv = document.getElementById('stockData');
    stockDataDiv.innerHTML = data.map(item => `<p><strong>${item.label}:</strong> ${item.value}</p>`).join('');
}

function toggleNav() {
    var sidebar = document.getElementById("mySidebar");
    var container = document.querySelector('.container');
    if (sidebar.style.left === "-200px" || sidebar.style.left === "") {
        sidebar.style.left = "0";
        container.style.marginLeft = "200px";
    } else {
        sidebar.style.left = "-200px";
        container.style.marginLeft = "0";
    }
}

document.getElementById('fetchDataBtn').addEventListener('click', function() {
    // Placeholder action, replace with actual data fetching logic
    var stockSymbol = document.getElementById('stockSymbol').value;
    document.getElementById('stockData').innerText = `Fetching data for ${stockSymbol}...`;
});


function getCategoryData(category, data) {
    if (!data) return [];

    switch (category) {
        case 'companyInfo':
            return [
                { label: 'Name', value: data.Name || 'N/A' },
                { label: 'Symbol', value: data.Symbol || 'N/A' },
                { label: 'Asset Type', value: data.AssetType || 'N/A' },
                { label: 'Description', value: data.Description || 'N/A' },
                { label: 'CIK', value: data.CIK || 'N/A' },
                { label: 'Exchange', value: data.Exchange || 'N/A' },
                { label: 'Currency', value: data.Currency || 'N/A' },
                { label: 'Country', value: data.Country || 'N/A' },
                { label: 'Sector', value: data.Sector || 'N/A' },
                { label: 'Industry', value: data.Industry || 'N/A' },
                { label: 'Address', value: data.Address || 'N/A' },
                { label: 'Fiscal Year End', value: data.FiscalYearEnd || 'N/A' },
                { label: 'Latest Quarter', value: data.LatestQuarter || 'N/A' }
            ];
        case 'financialInfo':
            return [
                { label: 'Market Capitalization', value: formatCurrency(data.MarketCapitalization) || 'N/A' },
                { label: 'EBITDA', value: formatCurrency(data.EBITDA) || 'N/A' },
                { label: 'PE Ratio', value: data.PERatio || 'N/A' },
                { label: 'PEG Ratio', value: data.PEGRatio || 'N/A' },
                { label: 'Book Value', value: data.BookValue || 'N/A' },
                { label: 'Dividend Per Share', value: formatCurrency(data.DividendPerShare) || 'N/A' },
                { label: 'Dividend Yield', value: `${(parseFloat(data.DividendYield) * 100).toFixed(2)}%` || 'N/A' },
                { label: 'EPS', value: data.EPS || 'N/A' },
                { label: 'Revenue Per Share TTM', value: formatCurrency(data.RevenuePerShareTTM) || 'N/A' },
                { label: 'Profit Margin', value: `${(parseFloat(data.ProfitMargin) * 100).toFixed(2)}%` || 'N/A' },
                { label: 'Operating Margin TTM', value: `${(parseFloat(data.OperatingMarginTTM) * 100).toFixed(2)}%` || 'N/A' },
                { label: 'Return on Assets TTM', value: `${(parseFloat(data.ReturnOnAssetsTTM) * 100).toFixed(2)}%` || 'N/A' },
                { label: 'Return on Equity TTM', value: `${(parseFloat(data.ReturnOnEquityTTM) * 100).toFixed(2)}%` || 'N/A' }
            ];
        case 'valuationMeasures':
            return [
                { label: 'Trailing PE', value: data.TrailingPE || 'N/A' },
                { label: 'Forward PE', value: data.ForwardPE || 'N/A' },
                { label: 'Price to Sales Ratio TTM', value: data.PriceToSalesRatioTTM || 'N/A' },
                { label: 'Price to Book Ratio', value: data.PriceToBookRatio || 'N/A' },
                { label: 'EV to Revenue', value: data.EVToRevenue || 'N/A' },
                { label: 'EV to EBITDA', value: data.EVToEBITDA || 'N/A' },
                { label: 'Beta', value: data.Beta || 'N/A' }
            ];
        case 'stockPriceInfo':
            return [
                { label: '52 Week High', value: formatCurrency(data['52WeekHigh']) || 'N/A' },
                { label: '52 Week Low', value: formatCurrency(data['52WeekLow']) || 'N/A' },
                { label: '50 Day Moving Average', value: formatCurrency(data['50DayMovingAverage']) || 'N/A' },
                { label: '200 Day Moving Average', value: formatCurrency(data['200DayMovingAverage']) || 'N/A' },
                { label: 'Shares Outstanding', value: parseInt(data.SharesOutstanding).toLocaleString() || 'N/A' },
                { label: 'Dividend Yield', value: `${(parseFloat(data.DividendYield) * 100).toFixed(2)}%` || 'N/A' },
                { label: 'Dividend Per Share', value: formatCurrency(data.DividendPerShare) || 'N/A' },
                { label: 'Dividend Date', value: data.DividendDate || 'N/A' },
                { label: 'Ex Dividend Date', value: data.ExDividendDate || 'N/A' }
            ];
        default:
            return [];
    }
}

// Helper function to format currency
function formatCurrency(amount) {
    if (!amount) return 'N/A';
    return `$${parseFloat(amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
} 
