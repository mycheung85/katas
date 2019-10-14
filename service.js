const productsList = require("./resources/products.json").map(item => item);
const ordersList = require("./resources/orders.json").map(item => item);
const usersList = require("./resources/users.json").map(item => item);

// console.log(productsList[0].productId);
var orderCount = 0;

const getOrderCountForUser = name => {
  const users = require("./resources/users.json");
  for (user of users) {
    if (user.name === name) {
      const userId = user.userId;
      const orders = require("./resources/orders.json");
      for (order of orders) {
        if (order.userId === userId) {
          orderCount++;
        }
      }
      return orderCount;
    }
  }
  return 0;
};

const getOrderCountForProduct = function(product) {
  // console.log(productsList);
  let total = 0;
  for (products of productsList) {
    let productId = products.productId;
    let productsName = products.productName;
    if (productsName === product) {
      for (orders of ordersList) {
        if (orders.productId === productId) {
          total++;
        }
      }
    }
  }
  return total;
};

function getCustomerNamesForProduct(product) {
  const productName = productsList.filter(item => item.productName === product);

  const orderMatch = ordersList.filter(order => {
    if (order.productId === productName[0].productId) {
      return order.userId;
    }
  });

  // console.log(orderMatch, "this is orderMatch");
  const userMatch = orderMatch.reduce((names, index) => {
    for (let i = 0; i < usersList.length; i++) {
      if (usersList[i].userId === index.userId) {
        names.push(usersList[i].name);
      }
    }
    return names;
  }, []);

  const names = [...new Set(userMatch)];
  const sortedNames = names.sort(function(a, b) {
    const nameA = a.toLowerCase(); // ignore upper and lowercase
    const nameB = b.toLowerCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  // console.log(sortedNames);
  return sortedNames;
}

const getMostPopularProduct = () => {
  // loop through products list
  // loop through orders list
  // if the 'productId' match, then create a [product]
  // count if the product loops again
  // return an array of objects
  // Math.Max the object.value

  const productCount = productsList.reduce((acc, products) => {
    for (order in ordersList) {
      if (
        acc[products.productName] === "undefined" &&
        products.productId === order.productId
      ) {
        acc[products.productName]++;
      } else {
        acc[products.productName] += 1;
      }
    }
    // console.log(acc);
    return acc;
  }, {});

  for (products in productCount) {
    console.log(products);
  }

  console.log(productCount);
  return ["chair"];
};

module.exports = {
  getOrderCountForUser,
  getOrderCountForProduct,
  getCustomerNamesForProduct,
  getMostPopularProduct
};
