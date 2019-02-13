-- Drops the bamazon DB if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "bamazon" database --
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect bamazon --
USE bamazon;

-- Creates the table "products" within bamazon --
CREATE TABLE products (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `department_name` varchar(45) DEFAULT NULL,
  `price` INT DEFAULT 0,
  `stock_quantity` INT DEFAULT 0,
  'product_sales' INT DEFAULT 0,
  PRIMARY KEY (`id`)
);

CREATE TABLE departments (
 department_id int (11) NOT NULL AUTO_INCREMENT,
 department_name varchar (100) DEFAULT NULL,
 over_head_costs INT DEFAULT 0,
 PRIMARY KEY (department_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Tennis Racquet", "athletics", 60, 5, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Toilet Paper", "home goods", 2, 70, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Soap", "home goods", 2, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Tooth Brush", "home goods", 10, 25, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("The Sims", "entertainment", 25, 10, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("PS4", "entertainment", 250, 10, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Bananas", "food", 4, 30, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Frozen Lazagna", "food", 7, 20, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Mop", "home goods", 5, 25, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Canned tomatoes", "food", 5, 20, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Tennis Balls", "athletics", 10, 20, 0);

INSERT INTO departments (department_name)
VALUES ("food");


SELECT * FROM products;
SELECT * FROM departments;
