$(document).ready(function() {
    const weatherForm = $('#weatherForm');
    const cityInput = $('#cityInput');
    const weatherInfo = $('#weatherInfo');
    const errorMessage = $('#errorMessage');

    // Function to format timestamp to readable time
    function formatTime(timestamp) {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Function to format visibility
    function formatVisibility(visibility) {
        return (visibility / 1000).toFixed(1) + ' km';
    }

    // Function to display error message
    function showError(message) {
        errorMessage.text(message).removeClass('d-none');
        weatherInfo.addClass('d-none');
    }

    // Function to update weather information
    function updateWeatherInfo(data) {
        $('#cityName').text(data.city);
        $('#temperature').text(`${data.temperature}°C`);
        $('#description').text(data.description);
        $('#feelsLike').text(`${data.feels_like}°C`);
        $('#humidity').text(`${data.humidity}%`);
        $('#windSpeed').text(`${data.wind_speed} m/s`);
        $('#pressure').text(`${data.pressure} hPa`);
        $('#visibility').text(formatVisibility(data.visibility));
        $('#clouds').text(`${data.clouds}%`);
        $('#sunrise').text(formatTime(data.sunrise));
        $('#sunset').text(formatTime(data.sunset));
        $('#weatherIcon').attr('src', `http://openweathermap.org/img/wn/${data.icon}@2x.png`);
        
        // Update current date and time
        const now = new Date();
        $('#datetime').text(now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }));
        
        weatherInfo.removeClass('d-none');
        errorMessage.addClass('d-none');

        // Add animation to weather details
        $('.detail-box').each(function(index) {
            $(this).css({
                'animation': `fadeInUp 0.5s ease forwards ${index * 0.1}s`,
                'opacity': '0'
            });
        });
    }

    // Handle form submission
    weatherForm.on('submit', function(e) {
        e.preventDefault();
        
        const city = cityInput.val().trim();
        
        if (!city) {
            showError('Please enter a city name');
            return;
        }

        // Show loading state
        weatherInfo.addClass('d-none');
        errorMessage.addClass('d-none');
        
        // Make API request
        $.ajax({
            url: '/weather/',
            method: 'POST',
            data: {
                city: city,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function(response) {
                if (response.success) {
                    updateWeatherInfo(response.data);
                } else {
                    showError(response.error || 'Failed to fetch weather data');
                }
            },
            error: function() {
                showError('An error occurred while fetching weather data');
            }
        });
    });

    // Add animation effects
    $('.detail-box').hover(
        function() {
            $(this).css('transform', 'translateY(-5px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // Clear error message when typing
    cityInput.on('input', function() {
        errorMessage.addClass('d-none');
    });

    // Add keypress event for better UX
    cityInput.on('keypress', function(e) {
        if (e.which === 13) {
            weatherForm.submit();
        }
    });
});
