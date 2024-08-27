# Order Management System

## Overview

The Order Management System is a RESTful API built using Flask and SQLAlchemy. This application enables users to manage customers, products, and orders through a set of API endpoints. Key features include:

- **Customer Management:** Create, retrieve, update, and delete customer records.
- **Product Management:** Create, retrieve, update, and delete product records.
- **Order Management:** Create, retrieve, update, and delete orders, with automatic total price calculation and quantity validation.

The application uses an SQLite database to persist data and supports basic CRUD operations for managing data.

## Features

- **Customer Management:**
  - **Create** a new customer.
  - **Retrieve** customer details by ID.
  - **Update** customer information.
  - **Delete** a customer record.

- **Product Management:**
  - **Create** a new product.
  - **Retrieve** product details by ID.
  - **Update** product information.
  - **Delete** a product record.

- **Order Management:**
  - **Create** a new order with specified product IDs.
  - **Retrieve** order details by ID.
  - **Update** an existing order.
  - **Delete** an order.
  - **Automatic Total Price Calculation:** Calculates total price based on product quantities.
  - **Quantity Validation:** Ensures sufficient stock before order creation or update.

## Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/yourusername/order_management.git
    cd order_management
    ```

2. **Set Up a Virtual Environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate 
    ```

3. **Install Dependencies:**

    Ensure you have a `requirements.txt` file with the following content:

    ```
    Flask
    Flask-SQLAlchemy
    ```

    Install the dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. **Initialize the Database:**

    Run the Flask application to set up the SQLite database and create the necessary tables:

    ```bash
    python app.py
    ```

