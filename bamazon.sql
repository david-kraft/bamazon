-- Creates a new database named "bamazon" --
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

-- unique id for each product --
item_id INT NOT NULL AUTO_INCREMENT,

-- Name of product --
product_name VARCHAR(100) NOT NULL,

department_name VARCHAR(45) NOT NULL,

-- Cost to customer --
price DECIMAL(12,2) NOT NULL,

-- how much of the product is available in stores --
stock_quantity INT NOT NULL,

PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Harry Potter Chessboard", "Games", 29.99, 100), 
("Scrabble", "Games", 10.00, 100), 
("GustBuster Portable Umbrella", "Clothing & Accessories", 35.00, 15), 
("Propeller Beanie", "Clothing & Accessories", 4.49, 3), 
("Nintendo Switch", "Video Games", 299.99, 50), 
("NEW Nintendo 3DS", "Video Games", 149.99, 300), 
("Mario Kart 8", "Video Games", 59.99, 50), 
("Pokemon Red for Game Boy", "Video Games", 500.00, 1), 
("The Fountainhead by Ayn Rand", "Books", 10.00, 500), 
("The Matrix DVD", "Movies", 5.99, 500);
