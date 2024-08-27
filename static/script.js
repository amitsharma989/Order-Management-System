// Create Customer
document.getElementById('createCustomerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    fetch('/customers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    }).then(response => response.json())
      .then(data => alert('Customer Created: ' + JSON.stringify(data)))
      .catch(error => console.error('Error:', error));
});

// Retrieve Customer
document.getElementById('getCustomerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('getCustomerId').value;
    fetch(`/customers/${id}/`)
        .then(response => response.json())
        .then(data => document.getElementById('customerResult').textContent = JSON.stringify(data))
        .catch(error => console.error('Error:', error));
});

// Update Customer
document.getElementById('updateCustomerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('updateCustomerId').value;
    const name = document.getElementById('updateCustomerName').value;
    const email = document.getElementById('updateCustomerEmail').value;
    fetch(`/customers/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    }).then(response => response.json())
      .then(data => alert('Customer Updated: ' + JSON.stringify(data)))
      .catch(error => console.error('Error:', error));
});

// Delete Customer
document.getElementById('deleteCustomerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('deleteCustomerId').value;
    fetch(`/customers/${id}/`, {
        method: 'DELETE'
    }).then(() => alert('Customer Deleted'))
      .catch(error => console.error('Error:', error));
});

// Create Product
document.getElementById('createProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value, 10);
    fetch('/products/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, quantity })
    }).then(response => response.json())
      .then(data => alert('Product Created: ' + JSON.stringify(data)))
      .catch(error => console.error('Error:', error));
});

// Retrieve Product
document.getElementById('getProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('getProductId').value;
    fetch(`/products/${id}/`)
        .then(response => response.json())
        .then(data => document.getElementById('productResult').textContent = JSON.stringify(data))
        .catch(error => console.error('Error:', error));
});

// Update Product
document.getElementById('updateProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('updateProductId').value;
    const name = document.getElementById('updateProductName').value;
    const price = parseFloat(document.getElementById('updateProductPrice').value);
    const quantity = parseInt(document.getElementById('updateProductQuantity').value, 10);
    fetch(`/products/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, quantity })
    }).then(response => response.json())
      .then(data => alert('Product Updated: ' + JSON.stringify(data)))
      .catch(error => console.error('Error:', error));
});

// Delete Product
document.getElementById('deleteProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('deleteProductId').value;
    fetch(`/products/${id}/`, {
        method: 'DELETE'
    }).then(() => alert('Product Deleted'))
      .catch(error => console.error('Error:', error));
});

// Create Order
document.getElementById('createOrderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const productIds = document.getElementById('orderProducts').value.split(',').map(id => parseInt(id.trim(), 10));
    fetch('/orders/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: productIds })
    }).then(response => response.json())
      .then(data => alert('Order Created: ' + JSON.stringify(data)))
      .catch(error => console.error('Error:', error));
});

// Retrieve Order
document.getElementById('getOrderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('getOrderId').value;
    fetch(`/orders/${id}/`)
        .then(response => response.json())
        .then(data => document.getElementById('orderResult').textContent = JSON.stringify(data))
        .catch(error => console.error('Error:', error));
});

// Update Order
document.getElementById('updateOrderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('updateOrderId').value;
    const productIds = document.getElementById('updateOrderProducts').value.split(',').map(id => parseInt(id.trim(), 10));
    fetch(`/orders/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: productIds })
    }).then(response => response.json())
      .then(data => alert('Order Updated: ' + JSON.stringify(data)))
      .catch(error => console.error('Error:', error));
});

// Delete Order
document.getElementById('deleteOrderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('deleteOrderId').value;
    fetch(`/orders/${id}/`, {
        method: 'DELETE'
    }).then(() => alert('Order Deleted'))
      .catch(error => console.error('Error:', error));
});
