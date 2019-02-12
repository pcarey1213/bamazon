var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Hamill09",
    database: "bamazon"
  });

  // connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // run the start function after the connection is made to prompt the user
  showProducts();
});

  function showProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      console.log(
        i+1 + ".) " +
          "Product: " +
          results[i].product_name +
          " || Product Id: " +
          results[i].id +
          " || Department: " +
          results[i].department_name +
          " || Price: $"+
          results[i].price +
          " || In Stock: " +
          results[i].stock_quantity
      );
    };
    buyProduct()
    })
  };

  function buyProduct () {
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
    inquirer
      .prompt([
          {
          name:"product",
          type: "input",
          message: "Which product would you like to buy? (enter product id)",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
            }
          },
          {
          name:"quantity",
          type: "input",
          message: "How many units would you like to buy? (enter quantity)",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
            }
          },
        ])
      .then(function(answer) {
        var chosenId = parseInt(answer.product);
        var chosenQuantity = parseInt(answer.quantity);
        console.log(chosenId);
        var chosenProduct;
        for (var i = 0; i < results.length; i++) {
          if (results[i].id === chosenId) {
            chosenProduct = results[i];
          };
        };
        console.log(chosenProduct);
        console.log(chosenProduct.stock_quantity)
        if (chosenProduct.stock_quantity<chosenQuantity){
        console.log(`Insufficient quantity!`);
        }
        else{
          var newQuantity=chosenProduct.stock_quantity-chosenQuantity
          console.log(newQuantity)
          connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newQuantity
            },
            {
              id: chosenId
            }
          ],
            function(error) {
            if (error) throw err;
            console.log("Product purchased!");
            showProducts();
           }
         );
        }
      });
    })
  };