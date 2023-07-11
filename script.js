const accessKey = 'jaBveFvP-CSLud9U-Z9vY3n3NCMS5NebsSyGbPKBUvY';
const apiUrl = 'https://api.unsplash.com/search/photos';



// Function to fetch images from the Unsplash API
function fetchImages(query) {
  const url = `${apiUrl}?query=${query}&client_id=${accessKey}`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error fetching images: ' + response.status);
      }
    })
    .then(data => {
      displayImages(data.results);
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
}


// Function to display images with zoom effect
function displayImages(images) {
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = '';

  images.forEach(image => {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    const imgElement = document.createElement('img');
    imgElement.src = image.urls.regular;
    imgElement.alt = image.alt_description;

    imgContainer.appendChild(imgElement);
    imageContainer.appendChild(imgContainer);

    imgContainer.addEventListener('click', () => {
      showImageDetails(image);
    })
  });

  // Function to show image details
function showImageDetails(image) {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const content = document.createElement('div');
  content.classList.add('modal-content');

  const imgElement = document.createElement('img');
  imgElement.src = image.urls.regular;
  imgElement.alt = image.alt_description;
  content.appendChild(imgElement);

  const details = document.createElement('div');
  details.classList.add('image-details');
  details.innerHTML = `
    <h2>Image Details</h2>
    <p>Created by: ${image.user.name}</p>
    <p>Likes: ${image.likes}</p>
    <p>Location: ${image.user.location}</p>
    <p>Portfolio: <a href="${image.user.portfolio_url}" target="_blank">${image.user.portfolio_url}</a></p>
  `;
  content.appendChild(details);

  modal.appendChild(content);
  document.body.appendChild(modal);

  modal.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}


  // Add event listeners for hover zoom effect
  const imgContainers = document.getElementsByClassName('img-container');
  Array.from(imgContainers).forEach(container => {
    container.addEventListener('mouseover', () => {
      container.classList.add('zoomed');
    });

    container.addEventListener('mouseout', () => {
      container.classList.remove('zoomed');
    });
  });
}

// Function to handle search button click
function onSearchButtonClick() {
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value.trim();

  if (query !== '') {
    currentQuery = query;
    currentPage = 1;
    fetchImages(query, currentPage);
  } else {
    alert('Please enter a keyword.');
  }
}
// Event listener for search button click
document.getElementById('search-button').addEventListener('click', onSearchButtonClick);
