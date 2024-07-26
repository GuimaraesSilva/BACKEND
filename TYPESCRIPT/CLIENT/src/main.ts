import './style.css';

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  brand: string;
  sku: string;
  image: string;
}

const API_URL = 'http://localhost:3000/products';


document.addEventListener('DOMContentLoaded', fetchProducts);

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    const products: Product[] = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function displayProducts(products: Product[]) {
  const app = document.getElementById('app')!;
  app.innerHTML = '';

  const productsContainer = document.createElement('div');
  productsContainer.className = 'container';
  productsContainer.innerHTML = `
    <h1>Product Management</h1>
    <div id="products"></div>
    <div class="add-product">
      <input type="text" id="new-product-title" placeholder="Product Title">
      <textarea id="new-product-description" placeholder="Product Description"></textarea>
      <input type="text" id="new-product-category" placeholder="Category">
      <input type="number" id="new-product-price" placeholder="Price">
      <input type="text" id="new-product-brand" placeholder="Brand">
      <input type="text" id="new-product-sku" placeholder="SKU">
      <input type="text" id="new-product-image" placeholder="Image URL">
      <button id="add-product-button">Add Product</button>
    </div>
  `;

  const productsDiv = productsContainer.querySelector('#products') as HTMLDivElement;

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.innerHTML = `
      <div class="product-details">
        <div>
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div>
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <p>Category: ${product.category}</p>
          <p>Price: $${product.price.toFixed(2)}</p>
          <p>Brand: ${product.brand}</p>
          <p>SKU: ${product.sku}</p>
        </div>
      </div>
      <div class="product-actions">
        <button class="edit" onclick="editProduct('${product.id}', '${product.title}', '${product.description}', '${product.category}', ${product.price}, '${product.brand}', '${product.sku}', '${product.image}')">Edit</button>
        <button class="delete" onclick="deleteProduct('${product.id}')">Delete</button>
      </div>
    `;
    productsDiv.appendChild(productElement);
  });

  app.appendChild(productsContainer);

  document.getElementById('add-product-button')!.addEventListener('click', addProduct);
}

async function addProduct() {
  const titleInput = document.getElementById('new-product-title') as HTMLInputElement;
  const descriptionInput = document.getElementById('new-product-description') as HTMLTextAreaElement;
  const categoryInput = document.getElementById('new-product-category') as HTMLInputElement;
  const priceInput = document.getElementById('new-product-price') as HTMLInputElement;
  const brandInput = document.getElementById('new-product-brand') as HTMLInputElement;
  const skuInput = document.getElementById('new-product-sku') as HTMLInputElement;
  const imageInput = document.getElementById('new-product-image') as HTMLInputElement;

  const newProduct: Partial<Product> = {
    title: titleInput.value,
    description: descriptionInput.value,
    category: categoryInput.value,
    price: parseFloat(priceInput.value),
    brand: brandInput.value,
    sku: skuInput.value,
    image: imageInput.value,
  };

  if (!newProduct.title || !newProduct.description || !newProduct.category || isNaN(newProduct.price!) || !newProduct.brand || !newProduct.sku || !newProduct.image) {
    alert('Please fill out all fields');
    return;
  }

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    });

    titleInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = '';
    priceInput.value = '';
    brandInput.value = '';
    skuInput.value = '';
    imageInput.value = '';
    fetchProducts();
  } catch (error) {
    console.error('Error adding product:', error);
  }
}

async function editProduct(id: string, oldTitle: string, oldDescription: string, oldCategory: string, oldPrice: number, oldBrand: string, oldSku: string, oldImage: string) {
  const newTitle = prompt('Enter new title:', oldTitle);
  const newDescription = prompt('Enter new description:', oldDescription);
  const newCategory = prompt('Enter new category:', oldCategory);
  const newPrice = parseFloat(prompt('Enter new price:', oldPrice.toString()) || '');
  const newBrand = prompt('Enter new brand:', oldBrand);
  const newSku = prompt('Enter new SKU:', oldSku);
  const newImage = prompt('Enter new image URL:', oldImage);

  if (!newTitle || !newDescription || !newCategory || isNaN(newPrice) || !newBrand || !newSku || !newImage) {
    alert('Please fill out all fields');
    return;
  }

  const updatedProduct: Partial<Product> = {
    title: newTitle,
    description: newDescription,
    category: newCategory,
    price: newPrice,
    brand: newBrand,
    sku: newSku,
    image: newImage,
  };

  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    });

    fetchProducts();
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

async function deleteProduct(id: string) {
  if (!confirm('Are you sure you want to delete this product?')) {
    return;
  }

  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    fetchProducts();
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

(window as any).editProduct = editProduct;
(window as any).deleteProduct = deleteProduct;