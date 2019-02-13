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
  whatToDo();
});

function whatToDo(){

  inquirer
  .prompt([
      {
      type: "list",
      name: "doingWhat",
      message: "What would you like to do?",
      choices: ["View Products for Sale", "Buy an Item", "End Session"]
      },
  ])
  .then(answers => {
      switch (answers.doingWhat) {
        case "View Products for Sale":
          showProducts();
          break;
        
        case "Buy an Item":
          buyProduct();
          break;

        case "End Session":
          endSession();
          break;
      };
  });
  };
  

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
          results[i].stock_quantity +
          " || Sales: $"+
          results[i].product_sales
      );
    };
    whatToDo()
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
        var purchaseId = parseInt(answer.product);
        var purchaseQuantity = parseInt(answer.quantity);
        console.log(purchaseId);
        var purchasedProduct;
        for (var i = 0; i < results.length; i++) {
          if (results[i].id === purchaseId) {
            purchasedProduct = results[i];
          };
        };
        console.log("You've selected " + purchaseQuantity + " of " + purchasedProduct.product_name);
        console.log("There are " + purchasedProduct.stock_quantity + " of " + purchasedProduct.product_name +" in stock")
        if (purchasedProduct.stock_quantity<purchaseQuantity){
        console.log(`Insufficient quantity!`);
        }
        else{
          console.log("------------------------------------------");
          var newQuantity=purchasedProduct.stock_quantity-purchaseQuantity;
          console.log("There are now " + newQuantity + " of " + purchasedProduct.product_name +" in stock");
          var sales=purchaseQuantity*purchasedProduct.price;
          console.log("Sales: $" + sales);
          connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newQuantity,
              product_sales: sales
            },
            {
              id: purchaseId
            }
          ],
            function(error) {
            if (error) throw err;
            console.log("You have purchased " + purchaseQuantity + " of " + purchasedProduct.product_name +" for $" + sales+"!");
            whatToDo();
           }
         );
        }
      });
    })
  };

  function endSession(){
    connection.end();
  }