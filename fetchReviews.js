// Initialize the map
var map = L.map('map').setView([33.4219999, -111.9400044], 15);

// Add the base map layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Example marker
var marker = L.marker([33.42369663, -111.9395518]).addTo(map);

// Fetch reviews from API
function fetchReviews() {
    fetch('https://1j7eedt0za.execute-api.us-east-2.amazonaws.com/production/reviews')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched reviews:', data);
            // Display reviews on the map or UI if necessary
        })
        .catch(error => console.error('Error fetching reviews:', error));
}

// Call the function to fetch reviews
fetchReviews();

// Handle form submission
document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const location = document.getElementById('location').value;
    const comments = document.getElementById('comments').value;
    const rating = document.getElementById('rating').value;

    // Send the review to the server
    const reviewData = {
        Location: location,
        Comments: comments,
        Rating: rating,
        Name: "Anonymous" // Optional: You could also allow users to enter their name
    };

    fetch('https://1j7eedt0za.execute-api.us-east-2.amazonaws.com/production/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Review submitted successfully:', data);
        alert('Review submitted!');
        // Optionally, refresh the reviews or add the new one to the map
        fetchReviews();
    })
    .catch(error => console.error('Error submitting review:', error));
});
