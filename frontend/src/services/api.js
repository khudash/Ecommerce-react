const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

/**
 * Fetch all Home page dynamic data in a single request
 */
export async function fetchHomePageData() {
  try {
    const response = await fetch(`${API_BASE_URL}/home/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Backend API unavailable or error fetching home data:', error);
    return null;
  }
}

/**
 * Fetch Dashboard live KPIs & Stats
 */
export async function fetchDashboardStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats/`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn('Error fetching dashboard stats:', error);
    return null;
  }
}

// ==========================================
// PRODUCTS & BUNDLES CRUD
// ==========================================
export async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products/`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn('Error fetching products from API:', error);
    return null;
  }
}

export async function createProduct(productData) {
  const response = await fetch(`${API_BASE_URL}/products/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to create product: ${errText}`);
  }
  return await response.json();
}

export async function updateProduct(id, productData) {
  const response = await fetch(`${API_BASE_URL}/products/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to update product: ${errText}`);
  }
  return await response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete product: ${response.statusText}`);
  }
  return true;
}

// ==========================================
// CUSTOMER ORDERS CRUD
// ==========================================
export async function fetchOrders() {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn('Error fetching orders from API:', error);
    return null;
  }
}

export async function createOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/orders/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Order placement failed: ${errText || response.statusText}`);
  }
  return await response.json();
}

export async function updateOrder(id, orderData) {
  const response = await fetch(`${API_BASE_URL}/orders/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to update order: ${errText}`);
  }
  return await response.json();
}

export async function updateOrderStatus(orderId, status) {
  return updateOrder(orderId, { status });
}

export async function deleteOrder(id) {
  const response = await fetch(`${API_BASE_URL}/orders/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete order: ${response.statusText}`);
  }
  return true;
}

// ==========================================
// REVIEWS CRUD
// ==========================================
export async function fetchReviews() {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn('Error fetching reviews from API:', error);
    return null;
  }
}

export async function submitReview(reviewData) {
  const response = await fetch(`${API_BASE_URL}/reviews/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  if (!response.ok) {
    throw new Error(`Failed to submit review: ${response.statusText}`);
  }
  return await response.json();
}

export async function updateReview(id, reviewData) {
  const response = await fetch(`${API_BASE_URL}/reviews/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to update review: ${errText}`);
  }
  return await response.json();
}

export async function deleteReview(id) {
  const response = await fetch(`${API_BASE_URL}/reviews/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete review: ${response.statusText}`);
  }
  return true;
}

// ==========================================
// FAQS CRUD
// ==========================================
export async function fetchFaqs() {
  try {
    const response = await fetch(`${API_BASE_URL}/faqs/`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn('Error fetching FAQs from API:', error);
    return null;
  }
}

export async function createFaq(faqData) {
  const response = await fetch(`${API_BASE_URL}/faqs/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(faqData),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to create FAQ: ${errText}`);
  }
  return await response.json();
}

export async function updateFaq(id, faqData) {
  const response = await fetch(`${API_BASE_URL}/faqs/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(faqData),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to update FAQ: ${errText}`);
  }
  return await response.json();
}

export async function deleteFaq(id) {
  const response = await fetch(`${API_BASE_URL}/faqs/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete FAQ: ${response.statusText}`);
  }
  return true;
}

// ==========================================
// BLOG ARTICLES CRUD
// ==========================================
export async function fetchBlogs() {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn('Error fetching blogs from API:', error);
    return null;
  }
}

export async function createBlog(blogData) {
  const response = await fetch(`${API_BASE_URL}/blogs/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogData),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to create blog article: ${errText}`);
  }
  return await response.json();
}

export async function updateBlog(id, blogData) {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogData),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to update blog article: ${errText}`);
  }
  return await response.json();
}

export async function deleteBlog(id) {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete blog article: ${response.statusText}`);
  }
  return true;
}

// ==========================================
// ACTIVE INGREDIENTS CRUD
// ==========================================
export async function fetchIngredients() {
  try {
    const response = await fetch(`${API_BASE_URL}/ingredients/`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn('Error fetching ingredients:', error);
    return null;
  }
}

export async function createIngredient(data) {
  const response = await fetch(`${API_BASE_URL}/ingredients/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create ingredient');
  return await response.json();
}

export async function updateIngredient(id, data) {
  const response = await fetch(`${API_BASE_URL}/ingredients/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update ingredient');
  return await response.json();
}

export async function deleteIngredient(id) {
  const response = await fetch(`${API_BASE_URL}/ingredients/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete ingredient');
  return true;
}

// ==========================================
// TRANSFORMATIONS (BEFORE / AFTER) CRUD
// ==========================================
export async function fetchTransformations() {
  try {
    const response = await fetch(`${API_BASE_URL}/transformations/`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn('Error fetching transformations:', error);
    return null;
  }
}

export async function createTransformation(data) {
  const response = await fetch(`${API_BASE_URL}/transformations/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create transformation');
  return await response.json();
}

export async function updateTransformation(id, data) {
  const response = await fetch(`${API_BASE_URL}/transformations/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update transformation');
  return await response.json();
}

export async function deleteTransformation(id) {
  const response = await fetch(`${API_BASE_URL}/transformations/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete transformation');
  return true;
}

export default {
  fetchHomePageData,
  fetchDashboardStats,
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchOrders,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  fetchReviews,
  submitReview,
  updateReview,
  deleteReview,
  fetchFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  fetchIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  fetchTransformations,
  createTransformation,
  updateTransformation,
  deleteTransformation,
};
