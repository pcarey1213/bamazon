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
    console.log(results);
    selectProduct()
  })
};

  function selectProduct () {
    inquirer
      .prompt([
          {
           name:"product",
           type: "input",
           message: "Which item would you like to buy? (enter product id)",
           validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
            }
          },
          {
           name:"product",
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
      
      })
  }