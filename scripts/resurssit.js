function fetchDataFromAPI() {
    fetch('https://api.spot-hinta.fi/TodayAndDayForward')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => moment(item.DateTime).format('YYYY-MM-DDTHH:mm:ssZ'));

            const priceWithTax = data.map(item => item.PriceWithTax);

            const ctx = document.getElementById('priceChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sähkön hinta sis. veron',
                        data: priceWithTax,
                        borderColor: 'red',
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            title: {
                                display: true,
                                text: 'DateTime'
                            },
                            time: {
                                unit: 'hour',
                                displayFormats: {
                                    hour: 'HH:mm'
                                },
                                tooltipFormat: 'HH:mm'
                            },
                            ticks: {
                                source: 'data'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price'
                            }
                        }
                    }
                }
                
                
            });
        })
        .catch(error => {
            console.error("There was an error fetching the data.", error);
            document.getElementById('data-container').innerHTML = 'Failed to fetch data from the API.';
        });
}
