const searchForm = document.getElementById('searchForm');
const resultsContainer = document.getElementById('resultsContainer');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  const query = searchForm.query.value; // Get the search query from the input field

  // Make API request
  const apiKey = 'YOUR_API_KEY';
  const apiUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';

  fetch(`${apiUrl}?input=${encodeURIComponent(query)}&inputtype=textquery&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Handle the response data here
      displayResults(data);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
});

function displayResults(data) {
  // Clear previous results
  resultsContainer.innerHTML = '';

  // Check if there are results
  if (data.status === 'OK' && data.candidates.length > 0) {
    const resultsList = document.createElement('ul');

    // Iterate through the results and create list items
    data.candidates.forEach(candidate => {
      const listItem = document.createElement('li');
      listItem.textContent = candidate.name;

      resultsList.appendChild(listItem);
    });

    // Append the results list to the container
    resultsContainer.appendChild(resultsList);
  } else {
    // Display a message if no results were found
    resultsContainer.textContent = 'No results found.';
  }
}
