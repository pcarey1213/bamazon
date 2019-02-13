var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table")

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
      choices: ["View Product Sales by Department", "Create New Department", "End Session"]
      },
  ])
  .then(answers => {
      switch (answers.doingWhat) {
        case "View Product Sales by Department":
          showProductSalesByDept();
          break;
        
        case "Create New Department":
          createDept();
          break;

        case "End Session":
          endSession();
          break;
      };
  });
  };

  function showProductSalesByDept (){
  var query= "SELECT departments.department_id, departments.department_name, departments.over_head_costs SELECT DISTINCT products.department_name LEFT JOIN departments ON (products.department_name=departments.department_name) GROUP BY department_name"
    connection.query(query, function(err, results) {
    if (err) throw err;
      for (var i = 0; i < results.length; i++) {
        console.table([
          {
            department_id: results [i].department_id,
            department_name: results[i].department_name,
            over_head_costs: results[i].over_head_costs,
            product_sales: results[i].product_sales,
            total_profit: results[i].total_profit
          }
        ]);
      };
    whatToDo()
    })
    };

  function endSession(){
    connection.end();
  }