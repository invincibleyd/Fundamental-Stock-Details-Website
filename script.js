document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'KJRVKPYCDDFU2F85'; // Your API key here

    document.getElementById('fetchDataBtn').addEventListener('click', function() {
        const symbol = document.getElementById('stockSymbol').value.toUpperCase().trim();
        if (symbol) {
            fetchStockData(symbol);
        } else {
            alert('Please enter a valid stock symbol.');
        }
    });
});

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

            navigateToDetailsPage(symbol);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again.');
        });
}

function navigateToDetailsPage(symbol) {
    window.location.href = `stock-details.html?symbol=${symbol}`;
}
