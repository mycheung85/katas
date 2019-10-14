var assert = require("assert");
var subject = require("./service");

describe("service", function() {
  describe("calculate orders", () => {
    it("should return 3 orders for sam", () => {
      assert.equal(
        subject.getOrderCountForUser("sam"),
        3,
        "number of users incorrect"
      );
    });
  });

  describe("calculate number of products", () => {
    it("should return 2 orders for hammer", () => {
      assert.equal(
        subject.getOrderCountForProduct("hammer"),
        2,
        "number of hammer orders incorrect"
      );
    });
  });

  describe("return names of customers that bought item", () => {
    it("should return bob & sue for chair", () => {
      assert.deepEqual(
        subject.getCustomerNamesForProduct("chair"),
        ["bob", "sue"],
        "customer name didnt match"
      );
    });
  });

  describe.only("return name of the most popular procduct", () => {
    it("should return chair", () => {
      assert.deepEqual(
        subject.getMostPopularProduct(),
        ["chair"],
        "most popular product incorrect"
      );
    });
  });
});
