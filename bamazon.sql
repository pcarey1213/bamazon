-- Drops the bamazon DB if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "bamazon" database --
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect animals_db --
USE bamazon;

-- Creates the table "products" within bamazon --
CREATE TABLE products (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `department_name` varchar(45) DEFAULT NULL,
  `price` INT DEFAULT 0,
  `stock_quantity` INT DEFAULT 0,
  PRIMARY KEY (`id`)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tennis Racquet", "athletics", 60, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toilet Paper", "home goods", 2, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soap", "home goods", 2, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tooth Brush", "home goods", 10, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Sims", "entertainment", 25, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PS4", "entertainment", 250, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bananas", "food", 4, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Frozen Lazagna", "food", 7, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mop", "home goods", 5, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canned tomatoes", "food", 5, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tennis Balls", "athletics", 10, 20);


