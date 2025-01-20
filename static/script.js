const apiUrl = 'http://localhost:3010/products';

const productsList = document.getElementById('products-list');

// Function to fetch products and display them
const fetchProducts = async (url) => {
  try {
    const response = await fetch(url);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Function to display products
const displayProducts = (products) => {
  productsList.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <img src="https://via.placeholder.com/220x150" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Brand: ${product.brand}</p>
      <p>OS: ${product.os}</p>
      <p>RAM: ${product.ram}GB</p>
      <p>Storage: ${product.rom}GB</p>
      <p>Camera: ${product.camera}MP</p>
      <p class="price">₹${product.price}</p>
      <p class="rating">Rating: ${product.rating} ★</p>
    `;

    productsList.appendChild(productCard);
  });
};

// Apply filters to the product list
const applyFilters = () => {
  let url = apiUrl;

  const brand = document.getElementById('brand').value.trim();
  const os = document.getElementById('os').value.trim();
  const price = document.getElementById('price').value.trim();
  const ram = document.getElementById('ram').value.trim();

  if (brand) url += `?brand=${brand}`;
  if (os) url += `&Os=${os}`;
  if (price) url += `&price=${price}`;
  if (ram) url += `&ram=${ram}`;

  fetchProducts(url);
};

// Apply sorting based on user selection
const applySorting = (sortType) => {
  let url = apiUrl;
  if (sortType === 'popularity') {
    url += '/sort/popularity';
  } else if (sortType === 'price-high-to-low') {
    url += '/sort/price-high-to-low';
  } else if (sortType === 'price-low-to-high') {
    url += '/sort/price-low-to-high';
  }
  fetchProducts(url);
};

// Event listeners for sorting buttons
document.getElementById('sort-popularity').addEventListener('click', () => {
  applySorting('popularity');
});

document.getElementById('sort-price-high-to-low').addEventListener('click', () => {
  applySorting('price-high-to-low');
});

document.getElementById('sort-price-low-to-high').addEventListener('click', () => {
  applySorting('price-low-to-high');
});

// Event listeners for input fields to apply filters
document.getElementById('brand').addEventListener('input', applyFilters);
document.getElementById('os').addEventListener('input', applyFilters);
document.getElementById('price').addEventListener('input', applyFilters);
document.getElementById('ram').addEventListener('input', applyFilters);

// Initial load of all products
fetchProducts(apiUrl);
