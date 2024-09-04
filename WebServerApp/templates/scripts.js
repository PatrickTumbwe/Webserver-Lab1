// Function to update date and time
function updateDateTime() {
    var now = new Date();
    var datetimeStr = now.toLocaleString();
    document.getElementById('datetime').innerText = datetimeStr;
}
setInterval(updateDateTime, 1000);

// Common chart options
var commonOptions = {
    animation: {
        duration: 1500,
        easing: 'easeOutBounce',
        from: 0,
        to: 1
    },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'minute',
                tooltipFormat: 'DD T'
            },
            ticks: {
                color: '#ffffff'
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.1)'
            }
        },
        y: {
            beginAtZero: true,
            ticks: {
                color: '#ffffff'
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.1)'
            }
        }
    },
    elements: {
        line: {
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)'
        },
        point: {
            radius: 4,
            backgroundColor: 'rgba(255, 99, 132, 1)',
            hoverRadius: 6
        }
    },
    plugins: {
        legend: {
            display: true,
            labels: {
                color: '#ffffff',
                font: {
                    size: 14,
                    weight: 'bold'
                }
            }
        }
    },
    layout: {
        padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    }
};

// Initialize temperature chart
var temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
var temperatureChart = new Chart(temperatureCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature (°C)',
            data: []
        }]
    },
    options: commonOptions
});

// Initialize humidity chart
var humidityCtx = document.getElementById('humidityChart').getContext('2d');
var humidityChart = new Chart(humidityCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Humidity (%)',
            data: []
        }]
    },
    options: commonOptions
});

// Function to fetch data from the server
function fetchData() {
    $.ajax({
        url: '/temperatures/',  // Ensure this URL matches the one in urls.py
        method: 'GET',
        success: function(response) {
            console.log("Data received:", response);

            var labels = [];
            var temperatureData = [];
            var humidityData = [];

            var latestData = response.slice(-30);

            latestData.forEach(function(dataPoint) {
                labels.push(dataPoint.timestamp);
                temperatureData.push(dataPoint.temperature);
                humidityData.push(dataPoint.humidity);
            });

            temperatureChart.data.labels = labels;
            temperatureChart.data.datasets[0].data = temperatureData;
            temperatureChart.update();

            humidityChart.data.labels = labels;
            humidityChart.data.datasets[0].data = humidityData;
            humidityChart.update();

            var latestTemperature = latestData[latestData.length - 1].temperature;
            var latestHumidity = latestData[latestData.length - 1].humidity;

            document.getElementById('temperatureValue').innerText = latestTemperature !== null ? latestTemperature + ' °C' : '-- °C';
            document.getElementById('humidityValue').innerText = latestHumidity !== null ? latestHumidity + ' %' : '-- %';
        },
        error: function(error) {
            console.error("Error fetching data:", error);
        }
    });
}

// Fetch data every 5 seconds
setInterval(fetchData, 2000);
