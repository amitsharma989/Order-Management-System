from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from collections import Counter
from flask import jsonify
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///order_management.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['STATIC_FOLDER'] = 'static'
db = SQLAlchemy(app)

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    products = db.Column(db.PickleType, nullable=False)  # List of product IDs
    total_price = db.Column(db.Float, nullable=False)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return send_from_directory('templates', 'index.html')


def calculate_total_price_and_validate_quantities(product_ids):
    product_counts = Counter(product_ids)
    products = Product.query.filter(Product.id.in_(product_counts.keys())).all()
    product_dict = {product.id: product for product in products}

    if len(product_dict) != len(product_counts):
        return None, 'Some products not found'

    total_price = 0
    for product_id, quantity in product_counts.items():
        product = product_dict.get(product_id)
        if not product:
            return None, f'Product ID {product_id} not found'
        if quantity > product.quantity:
            return None, f'Not enough quantity for product ID {product_id}'
        total_price += product.price * quantity

    return total_price, None

@app.route('/customers/', methods=['POST'])
def create_customer():
    data = request.json
    new_customer = Customer(name=data['name'], email=data['email'])
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({'id': new_customer.id}), 201

@app.route('/customers/<int:customer_id>/', methods=['GET'])
def get_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    return jsonify({'id': customer.id, 'name': customer.name, 'email': customer.email})

@app.route('/customers/<int:customer_id>/', methods=['PUT'])
def update_customer(customer_id):
    data = request.json
    customer = Customer.query.get_or_404(customer_id)
    customer.name = data['name']
    customer.email = data['email']
    db.session.commit()
    return jsonify({'id': customer.id, 'name': customer.name, 'email': customer.email})

@app.route('/customers/<int:customer_id>/', methods=['DELETE'])
def delete_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    db.session.delete(customer)
    db.session.commit()
    return '', 204


@app.route('/products/', methods=['POST'])
def create_product():
    data = request.json
    new_product = Product(name=data['name'], price=data['price'], quantity=data['quantity'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'id': new_product.id}), 201

@app.route('/products/<int:product_id>/', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify({'id': product.id, 'name': product.name, 'price': product.price, 'quantity': product.quantity})

@app.route('/products/<int:product_id>/', methods=['PUT'])
def update_product(product_id):
    data = request.json
    product = Product.query.get_or_404(product_id)
    product.name = data['name']
    product.price = data['price']
    product.quantity = data['quantity']
    db.session.commit()
    return jsonify({'id': product.id, 'name': product.name, 'price': product.price, 'quantity': product.quantity})

@app.route('/products/<int:product_id>/', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return '', 204

@app.route('/orders/', methods=['POST'])
def create_order():
    data = request.get_json()
    product_ids = data.get('product_ids', [])

    if not product_ids:
        return jsonify({'error': 'No product IDs provided'}), 400

    total_price, error = calculate_total_price_and_validate_quantities(product_ids)
    if error:
        return jsonify({'error': error}), 400

    return jsonify({'total_price': total_price}), 201


@app.route('/orders/<int:order_id>/', methods=['GET'])
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify({'id': order.id, 'products': order.products, 'total_price': order.total_price})

@app.route('/orders/<int:order_id>/', methods=['PUT'])
def update_order(order_id):
    data = request.json
    order = Order.query.get_or_404(order_id)
    product_ids = data['products']
    total_price, error = calculate_total_price_and_validate_quantities(product_ids)
    
    if error:
        return jsonify({'error': error}), 400
    
    order.products = product_ids
    order.total_price = total_price
    db.session.commit()
    
    return jsonify({'id': order.id, 'products': order.products, 'total_price': order.total_price})

@app.route('/orders/<int:order_id>/', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    db.session.delete(order)

    db.session.commit()
    return '', 204

if __name__ == '__main__':

    if not os.path.exists(app.config['STATIC_FOLDER']):
        os.makedirs(app.config['STATIC_FOLDER'])
    app.run(debug=True)
