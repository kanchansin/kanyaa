// src/services/productService.js

// Mock data for products
const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    description: "Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear or custom designs.",
    price: 19.99,
    imageUrl: "/images/products/tshirt.jpg",
    category: "clothing",
    variants: [
      { id: 101, color: "White", size: "S", stock: 15 },
      { id: 102, color: "White", size: "M", stock: 20 },
      { id: 103, color: "White", size: "L", stock: 18 },
      { id: 104, color: "Black", size: "S", stock: 10 },
      { id: 105, color: "Black", size: "M", stock: 25 },
      { id: 106, color: "Black", size: "L", stock: 17 }
    ],
    isFeatured: true
  },
  {
    id: 2,
    name: "Ceramic Mug",
    description: "11oz ceramic mug, perfect for coffee, tea, or hot chocolate. Dishwasher and microwave safe.",
    price: 12.99,
    imageUrl: "/images/products/mug.jpg",
    category: "home-decor",
    variants: [
      { id: 201, color: "White", size: "11oz", stock: 30 },
      { id: 202, color: "Black", size: "11oz", stock: 25 }
    ],
    isFeatured: true
  },
  {
    id: 3,
    name: "Canvas Tote Bag",
    description: "Heavy-duty canvas tote bag with reinforced straps. Great for shopping or beach days.",
    price: 15.99,
    imageUrl: "/images/products/tote.jpg",
    category: "accessories",
    variants: [
      { id: 301, color: "Natural", size: "One Size", stock: 22 },
      { id: 302, color: "Black", size: "One Size", stock: 18 }
    ],
    isFeatured: false
  },
  {
    id: 4,
    name: "Pullover Hoodie",
    description: "Warm and cozy pullover hoodie with front pocket. Made from soft fleece material.",
    price: 34.99,
    imageUrl: "/images/products/hoodie.jpg",
    category: "clothing",
    variants: [
      { id: 401, color: "Gray", size: "S", stock: 12 },
      { id: 402, color: "Gray", size: "M", stock: 15 },
      { id: 403, color: "Gray", size: "L", stock: 10 },
      { id: 404, color: "Navy", size: "S", stock: 8 },
      { id: 405, color: "Navy", size: "M", stock: 14 },
      { id: 406, color: "Navy", size: "L", stock: 9 }
    ],
    isFeatured: true
  },
  {
    id: 5,
    name: "Phone Case",
    description: "Durable and stylish phone case with full access to all ports and buttons.",
    price: 19.99,
    imageUrl: "/images/products/phonecase.jpg",
    category: "accessories",
    variants: [
      { id: 501, color: "Clear", size: "iPhone 12/13", stock: 20 },
      { id: 502, color: "Clear", size: "iPhone 14", stock: 25 },
      { id: 503, color: "Clear", size: "Samsung S21", stock: 15 }
    ],
    isFeatured: false
  },
  {
    id: 6,
    name: "Poster Print",
    description: "High-quality poster print on premium paper. Available in multiple sizes.",
    price: 14.99,
    imageUrl: "/images/products/poster.jpg",
    category: "home-decor",
    variants: [
      { id: 601, color: "Matte", size: "12x18", stock: 30 },
      { id: 602, color: "Matte", size: "18x24", stock: 25 },
      { id: 603, color: "Glossy", size: "12x18", stock: 20 },
      { id: 604, color: "Glossy", size: "18x24", stock: 15 }
    ],
    isFeatured: true
  },
  {
    id: 7,
    name: "Notebook",
    description: "60-page lined notebook with hardcover. Perfect for notes, journaling, or sketching.",
    price: 9.99,
    imageUrl: "/images/products/notebook.jpg",
    category: "stationery",
    variants: [
      { id: 701, color: "Blue", size: "A5", stock: 35 },
      { id: 702, color: "Black", size: "A5", stock: 30 },
      { id: 703, color: "Red", size: "A5", stock: 25 }
    ],
    isFeatured: false
  },
  {
    id: 8,
    name: "Baseball Cap",
    description: "Adjustable baseball cap with embroidered design. One size fits most.",
    price: 17.99,
    imageUrl: "/images/products/cap.jpg",
    category: "accessories",
    variants: [
      { id: 801, color: "Black", size: "One Size", stock: 20 },
      { id: 802, color: "Navy", size: "One Size", stock: 15 },
      { id: 803, color: "Red", size: "One Size", stock: 18 }
    ],
    isFeatured: true
  }
];

// Function to get all products
export const getAllProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500); // Simulate API delay
  });
};

// Function to get featured products
export const fetchFeaturedProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const featured = products.filter(product => product.isFeatured);
      resolve(featured);
    }, 500); // Simulate API delay
  });
};

// Function to get a product by ID
export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find(p => p.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    }, 300); // Simulate API delay
  });
};

// Function to get products by category
export const getProductsByCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = products.filter(p => p.category === category);
      resolve(filteredProducts);
    }, 300); // Simulate API delay
  });
};

// Function to search products
export const searchProducts = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const searchResults = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) || 
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      resolve(searchResults);
    }, 300); // Simulate API delay
  });
};