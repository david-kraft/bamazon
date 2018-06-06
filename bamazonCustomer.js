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
  console.log(res);

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

  // Write inquirer code that asks customer what they would like to buy.

  

  // Ask user how many they'd like to buy.
  // Based on user input, select the relevant columns where the id = the user input
  // 

  // check to see if there is enough quantity in stock
  // if the item is not in stock
  //   // console log "Item is out of stock!"
  // else
  //   // update database with new quantity and either exit or return to the main menu.

  // }
});


