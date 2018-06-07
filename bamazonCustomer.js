var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// create the connection information for the sql database
var con = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query("SELECT * from products;", function (err, res) {
  if (err) throw err;

  // Create a CLI table
  var table = new Table({
    head: [
      "ID:",
      "Product Name:",
      "Department Name:",
      "Price:",
      "Stock Quantity:"
    ],
  });

  // loop through res and display the relevant data properly.
  for (let i = 0; i < res.length; i++) {
    let element = res[i];

    // Push new row to table
    table.push(
      [element.item_id,
      element.product_name,
      element.department_name,
      element.price,
      element.stock_quantity]
    );
  }

  // Log the table
  console.log(table.toString());


  inquirer
    .prompt([

      // Write inquirer code that asks customer what they would like to buy.
      {
        type: "input",
        name: "productReq",
        message: "What would you like to buy? Enter the product's ID from the inventory table above."
      },

      // Here we ask the user to confirm.
      {
        type: "confirm",
        message: "Are you sure:",
        name: "confirm",
        default: true
      },

      // Ask user how many they'd like to buy.
      {
        type: "input",
        name: "quantityReq",
        message: "How much of this item do you want to get? Enter an integer."
      },

      // Here we ask the user to confirm.
      {
        type: "confirm",
        message: "Are you sure:",
        name: "confirm",
        default: true
      }

    ])
    .then(function (inquirerRes) {
      var chosenItem;
      chosenItem = res[inquirerRes.productReq]
        console.log("Remaining stock: " + chosenItem.stock_quantity)
        console.log("Requested number: " + inquirerRes.quantityReq)
      if (chosenItem.stock_quantity >= inquirerRes.quantityReq) {
        console.log("We have enough in stock! We will ship your item!")
        con.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: chosenItem.stock_quantity - inquirerRes.quantityRequest
            },
            {
              id: chosenItem.item_id
            }
          ],
          function (error) {
            if (error) throw err;
            console.log("Bid placed successfully!");
            start();
          }
        )
      } else {
        // Not enough stock message
        console.log("I don't have enough in stock to fulfill your order.");
      }
    }
    );


});