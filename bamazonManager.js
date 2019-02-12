var mysql = require("mysql");
var inquirer = require("inquirer");

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

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    whatToDo();
  });

  function whatToDo(){

    inquirer
    .prompt([
        {
        type: "list",
        name: "doingWhat",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        },
    ])
    .then(answers => {
        switch (answers.doingWhat) {
            case "View Products for Sale":
                showProducts();
                break;
            
            case "View Low Inventory":
                showLow();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addProduct();
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
            results[i].stock_quantity
        );
    };
    whatToDo()
    })
    };

  function showLow(){
    var lowEnd=0;
    var highEnd=5;
    var query = "SELECT * FROM products WHERE stock_quantity BETWEEN ? AND ?"
    connection.query(query, [lowEnd, highEnd], function(err, results) {
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
          " || Price: " +
          results[i].price +
          " || In Stock: " +
          results[i].stock_quantity
        );
      };
    whatToDo();
    });
  };

  function addToInventory () {
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
    inquirer
      .prompt([
          {
          name:"product",
          type: "input",
          message: "Which product would you like to add more of? (enter product id)",
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
          message: "How many units would you like to add? (enter quantity)",
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
        console.log(chosenProduct.stock_quantity);
        var newQuantity=chosenProduct.stock_quantity+chosenQuantity;
        console.log(newQuantity);
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
            console.log("Product updated!");
            whatToDo();
            }
        );
      });
    })
  };

  function addProduct() {
    inquirer
      .prompt([
        {
        name: "product",
        type: "input",
        message: "What is the product you would like to submit?"
        },
        {
        name: "category",
        type: "input",
        message: "Which department would you like to place your product in?"
        },
        {
        name: "price",
        type: "input",
        message: "What is the price of the product?",
        validate: function(value) {
        if (isNaN(value) === false) {
            return true;
        }
        return false;
        }
        },
        {
        name: "quantity",
        type: "input",
        message: "How many units would you like to add? (enter quantity)",
        validate: function(value) {
        if (isNaN(value) === false) {
            return true;
        }
        return false;
        }
        }
      ])
      .then(function(answer) {

        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.product,
            department_name: answer.category,
            price: answer.price|| 0,
            stock_quantity: answer.quantity || 0,
          },
          function(err) {
            if (err) throw err;
            console.log("Your product was added successfully!");
            whatToDo();
          }
        );
      });
  }
