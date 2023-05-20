const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "supplychain",
});
app.post("/authentication", (req, res) => {
  const userAccount = req.body.userAccount;
  console.log(userAccount, "idr to dekho");
  db.query(
    "SELECT * FROM users WHERE public_key = ? && role_status != ?",
    [userAccount, "pending"],
    (err, result) => {
      if (result.length > 0) {
        res.send(result[0].role);
      } else {
        res.send("Register yourself or wait for approval");
      }
    }
  );
});
app.post("/microfinance", (req, res) => {
  const id = req.body.id;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const name = req.body.name;
  const dates = req.body.dates;
  db.query(
    "SELECT * FROM loan WHERE user = ?  && status != ?",
    [id, "paid"],
    (err, result) => {
      console.log(result);
      if (result.length === 0) {
        db.query(
          "INSERT INTO loan (user,crop_name,quantity,exp_price,yield_date,holding,amount,status,days_left) VALUES(?,?,?,?,?,?,?,?,?)",
          [id, name, quantity, price, dates, 0, 0, "open", dates],
          (err, result) => {
            if (result) {
              res.send("Successfull 3");
            } else {
              res.send("Something went wrong");
            }
          }
        );
      } else {
        res.send("You have already taken a loan");
      }
    }
  );
});
app.post("/registration", (req, res) => {
  const userAccount = req.body.userAccount;
  const name = req.body.name;
  const number = req.body.number;
  const address = req.body.address;
  const role = req.body.role;
  db.query(
    "SELECT * FROM users WHERE public_key = ?",
    [userAccount],
    (err, result) => {
      if (result.length > 0) {
        res.send("User id already exists");
      } else {
        db.query(
          "INSERT INTO users (public_key,role,balance,role_status,name,number,address) VALUES(?,?,?,?,?,?,?)",
          [userAccount, role, 0, "pending", name, number, address],
          (err, result) => {
            if (result) {
              res.send("Successfully regsitered. Now wait for approval");
            }
          }
        );
      }
    }
  );
});
app.post("/offer/:idd", (req, res) => {
  const id = req.params["idd"];
  const cropId = req.body.id;
  const seller = req.body.name;
  const userAccount = req.body.user;
  const crop = req.body.crop;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const priceC = req.body.priceC;
  //  insert bid once

  db.query(
    "SELECT * FROM offers WHERE buyer = ? && crop_id = ?",
    [userAccount, id],
    (err, result) => {
      if (result.length == 0) {
        db.query(
          "INSERT INTO offers (buyer,seller,price,crop_id,crop_name,quantity,bid_price,status) VALUES(?,?,?,?,?,?,?,?)",
          [userAccount, seller, price, id, crop, quantity, priceC, "open"],
          (err, result) => {
            if (result) {
              res.send("Successfully Bidded");
            }
          }
        );
      } else {
        res.send("Already bidded");
      }
    }
  );
});
app.post("/farmerbrodcast", (req, res) => {
  const userAccount = req.body.id;
  const crop = req.body.crop;
  const quantity = req.body.quantity;
  const price = req.body.price;
  db.query(
    "INSERT INTO farmer_brodcast (public_key,crop,quantity,price,status) VALUES(?,?,?,?,?)",
    [userAccount, crop, quantity, price, "open"],
    (err, result) => {
      if (result) {
        res.send("Successfully Brodcasted");
      }
    }
  );
});
app.post("/paid", (req, res) => {
  const crop_name = req.body.crop_name;
  const qprice = req.body.qprice;
  const lotId = req.body.lotId;
  const buyer = req.body.buyer;
  const seller = req.body.seller;
  const quantity = req.body.quantity;
  db.query(
    "INSERT INTO orders (crop_name,price,crop_id,buyer,seller,quantity,status) VALUES(?,?,?,?,?,?,?)",
    [crop_name, qprice, lotId, buyer, seller, quantity, "no"],
    (err, result) => {
      if (result) {
        db.query(
          "UPDATE  farmer_brodcast SET status = ? WHERE id = ?",
          ["retailer", lotId],
          (err, result) => {
            if (result) {
              db.query(
                "UPDATE  offers SET status = ? WHERE crop_id = ?",
                ["paid", lotId],
                (err, result) => {
                  if (result) {
                    db.query(
                      "UPDATE  insurance SET status = ? WHERE crop_id = ?",
                      ["sold", lotId],
                      (err, result) => {
                        if (result) {
                          res.send("Payment done");
                        }
                      }
                    );
                  }
                }
              );
            } else {
              res.send("Unable to update");
            }
          }
        );
      }
    }
  );
});
app.post("/qualityReport", (req, res) => {
  const crop = req.body.crop;
  const quantity = req.body.quantity;
  const samples = req.body.samples;
  const defect = req.body.defect;
  const remarks = req.body.remarks;
  const id = req.body.id;
  db.query(
    "UPDATE  insurance SET status = ? WHERE crop_id = ?",
    ["done", id],
    (err, result) => {
      if (result) {
        db.query(
          "INSERT INTO report (crop_id,sample_size,defective,remark) VALUES(?,?,?,?)",
          [id, samples, defect, remarks],
          (err, result) => {
            if (result) {
              res.send("Successfully Added report");
            }
          }
        );
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.get("/verify", (req, res) => {
  db.query(
    "SELECT * FROM users WHERE role_status = ?",
    ["pending"],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/requestPendingPayments", (req, res) => {
  db.query(
    "SELECT * FROM loan WHERE status = ?",
    ["pending"],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/retailerBrodcast", (req, res) => {
  db.query(
    "SELECT * FROM processor WHERE status = ? ORDER BY id DESC",
    ["open"],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/loanRequest", (req, res) => {
  db.query("SELECT * FROM loan WHERE status = ?", ["open"], (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  });
});
app.get("/orders/:id", (req, res) => {
  const id = req.params["id"];
  db.query("SELECT * FROM orders WHERE seller = ?", [id], (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  });
});
app.get("/payback/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM loan WHERE user = ? && status = ?",
    [id, "processed"],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/investorRequests/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM loan WHERE user = ? && status = ?",
    [id, "open"],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/requestCreditScore/:id", (req, res) => {
  const id = req.params["id"];
  db.query("SELECT * FROM credit_score WHERE user = ?", [id], (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  });
});
app.get("/history/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM orders WHERE seller = ? ORDER BY id DESC",
    [id],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/previousPurchases/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM sales WHERE buyer = ? ORDER BY id DESC",
    [id],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/pendingPayments/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT offers.crop_id,offers.price, offers.seller,offers.bid_price,offers.crop_name,offers.quantity FROM offers JOIN insurance ON offers.crop_id = insurance.crop_id WHERE offers.buyer = ? && insurance.status = ?",
    [id, "done"],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/processorPurchases/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM orders WHERE buyer = ? && status = ?",
    [id, "no"],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/retailerPurchases/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM retailer WHERE buyer = ? && status = ?",
    [id, "open"],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/processorInterest/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM offers WHERE buyer = ? ORDER BY id DESC",
    [id, "open"],

    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.put("/insure/:id/:crop_id", (req, res) => {
  const id = req.params["id"];
  const crop_id = req.params["crop_id"];
  const name = req.body.name;
  const quantity = req.body.quantity;

  db.query(
    "SELECT * FROM insurance WHERE crop_id = ?",
    [crop_id],
    (err, result) => {
      if (result.length == 0) {
        db.query(
          "UPDATE offers  SET status = ?  WHERE crop_id = ?",
          ["approve", id],

          (err, result) => {
            if (result) {
              db.query(
                "INSERT INTO insurance (crop_id,status,name,quantity) VALUES(?,?,?,?)",
                [crop_id, "insured", name, quantity],
                (err, result) => {
                  if (result) {
                    res.send("Successfull 1");
                  }
                }
              );
            } else {
              res.send(false);
            }
          }
        );
      } else {
        res.send("already insured");
      }
    }
  );
});
app.get("/processorBids/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM offers WHERE seller = ? && status = ?",
    [id, "open"],

    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/qualityC", (req, res) => {
  db.query(
    "SELECT * FROM insurance WHERE status = ? ORDER BY id DESC",
    ["insured"],

    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/farmerbrodcastcall/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM farmer_brodcast WHERE public_key = ? && status = ?",
    [id, "open"],

    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/reportScore/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM report WHERE crop_id = ?",
    [id],

    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/ratingScore/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM credit_score WHERE user = ? ",
    [id],

    (err, result) => {
      if (result.length == 0) {
        // insert
        db.query(
          "INSERT INTO credit_score (user,total_rating_count,credit_score) VALUES(?,?,?)",
          [id, 0, 0],
          (err, result) => {
            if (result) {
              res.send({
                total_rating_count: 0,
                credit_score: 0,
              });
            }
          }
        );
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/report/:lotId", (req, res) => {
  const id = req.params["lotId"];
  db.query(
    "SELECT * FROM report WHERE crop_id = ? ",
    [id],

    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/farmerbrodcastcallprocessor", (req, res) => {
  db.query(
    "SELECT * FROM farmer_brodcast WHERE  status = ? ORDER BY id DESC",
    ["open"],

    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/reailerBrodcasts/:id", (req, res) => {
  db.query(
    "SELECT * FROM customer WHERE  status = ? ORDER BY id DESC",
    ["open"],

    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/checkAvailability/:id/:quantity", (req, res) => {
  const id = req.params["id"];
  const quantity = req.params["quantity"];
  db.query(
    "SELECT * FROM customer WHERE  crop_id = ? && status = ? && quantity >= ?",
    [id, "open", quantity],

    (err, result) => {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({
          text: "Enter a valid quantity",
        });
      }
    }
  );
});
app.delete("/reject/:id", (req, res) => {
  const id = req.params["id"];

  db.query("DELETE  FROM users WHERE id = ?", [id], (err, result) => {
    if (result) {
      res.send("Deleted Successfully");
    } else {
      res.send("Unable to Delete");
    }
  });
});
app.delete("/rejectInvestment/:id", (req, res) => {
  const id = req.params["id"];

  db.query(
    "DELETE  FROM loan WHERE user = ? && status = ?",
    [id, "open"],
    (err, result) => {
      if (result) {
        res.send("Deleted Successfully");
      } else {
        res.send("Unable to Delete");
      }
    }
  );
});
app.put("/approve/:id", (req, res) => {
  const id = req.params["id"];

  db.query(
    "UPDATE  users SET role_status = ? WHERE id = ?",
    ["approved", id],
    (err, result) => {
      if (result) {
        res.send("Successfully Updated");
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.put("/paidFarmerByInvestor/:id", (req, res) => {
  const id = req.params["id"];

  db.query(
    "UPDATE  loan SET status = ? WHERE user = ? && status = ?",
    ["processed", id, "pending"],
    (err, result) => {
      if (result) {
        res.send("Successfully Updated");
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.put("/paidToInvestor/:id", (req, res) => {
  const id = req.params["id"];

  db.query(
    "UPDATE  loan SET status = ? WHERE user = ? && status = ?",
    ["paid", id, "processed"],
    (err, result) => {
      if (result) {
        res.send("Successfully Updated");
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.put("/updateInvestment/:id", (req, res) => {
  const id = req.params["id"];

  db.query(
    "UPDATE  loan SET status  = ? WHERE user = ? && status = ?",
    ["pending", id, "open"],
    (err, result) => {
      if (result) {
        res.send("Successfully Updated");
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.put("/investorRequest/:id", (req, res) => {
  const id = req.params["id"];
  const holding = req.body.holding;
  const amount = req.body.amount;
  db.query(
    "UPDATE  loan SET holding = ?, amount = ? WHERE user = ?",
    [holding, amount, id],
    (err, result) => {
      if (result) {
        res.send("Successfully Updated");
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.put("/creditUpdate/:id", (req, res) => {
  const id = req.params["id"];
  const trc = req.body.trc;
  const cs = req.body.cs;
  db.query(
    "UPDATE  credit_score SET total_rating_count = ? , credit_score = ? WHERE user = ?",
    [trc, cs, id],
    (err, result) => {
      if (result) {
        res.send("Successfully Updated creditScore");
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.post("/brodcastToRetailer/:id", (req, res) => {
  const id = req.params["id"];
  const userAccount = req.body.id;
  const product = req.body.product;
  const quantity = req.body.quantity;
  const price = req.body.price;
  db.query(
    "UPDATE  orders SET status = ? WHERE crop_id = ?",
    ["yes", id],
    (err, result) => {
      if (result) {
        //insert

        db.query(
          "INSERT INTO processor (product_name,crop_id,quantity,price,processor,status) VALUES(?,?,?,?,?,?)",
          [product, id, quantity, price, userAccount, "open"],
          (err, result) => {
            if (result) {
              res.send("Successfully Brodcasted to retailer");
            }
          }
        );
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.post("/customerPayment/:id", (req, res) => {
  const id = req.params["id"];
  const userAccount = req.body.buyer;
  const seller = req.body.seller;
  const product = req.body.product;
  const quantity = req.body.quantityE;
  const price = req.body.price;
  let newQ;
  let tableQ;
  db.query(
    "INSERT INTO sales (crop_id,product_name,quantity,buyer, seller,price) VALUES(?,?,?,?,?,?)",
    [id, product, quantity, userAccount, seller, price],
    (err, result) => {
      if (result) {
        db.query(
          "SELECT * FROM customer WHERE crop_id = ?",
          [id],
          (err, result) => {
            if (result) {
              tableQ = result[0].quantity;
              newQ = tableQ - quantity;

              if (newQ == 0) {
                // update with status close
                db.query(
                  "UPDATE  customer SET  quantity = ? , status = ?  WHERE crop_id = ?",
                  [newQ, "close", id],
                  (err, result) => {
                    if (result) {
                      res.send("Successfully Updated in customer Db1");
                    } else {
                      res.send("Unable to update");
                    }
                  }
                );
              } else {
                // update only qunatity
                db.query(
                  "UPDATE  customer SET  quantity = ? WHERE crop_id = ?",
                  [newQ, id],
                  (err, result) => {
                    if (result) {
                      res.send("Successfully Updated in customer Db2");
                    } else {
                      res.send("Unable to update");
                    }
                  }
                );
              }
            } else {
              res.send("Unable to update");
            }
          }
        );
      }
    }
  );
});
app.post("/brodcastToCustomer/:id", (req, res) => {
  const id = req.params["id"];
  const userAccount = req.body.brodcaster;
  const price = req.body.price;
  let quantity;
  let product;
  db.query(
    "UPDATE  retailer SET status = ? WHERE crop_id = ?",
    ["yes", id],
    (err, result) => {
      if (result) {
        db.query(
          "SELECT * FROM retailer WHERE crop_id = ?",
          [id],
          (err, result) => {
            if (result) {
              quantity = result[0].quantity;
              product = result[0].product_name;

              db.query(
                "INSERT INTO customer (product_name,crop_id,quantity,price,retailer,status) VALUES(?,?,?,?,?,?)",
                [product, id, quantity, price, userAccount, "open"],
                (err, result) => {
                  if (result) {
                    res.send("Successfully Brodcasted to Customer");
                  }
                }
              );
            } else {
              res.send(false);
            }
          }
        );
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.post("/paidProcessor/:id", (req, res) => {
  const id = req.params["id"];
  const userAccount = req.body.buyer;
  const seller = req.body.seller;
  const product = req.body.product;
  const quantity = req.body.quantity;
  const price = req.body.price;
  db.query(
    "UPDATE  processor SET status = ? WHERE crop_id = ?",
    ["close", id],
    (err, result) => {
      if (result) {
        //insert

        db.query(
          "INSERT INTO retailer (crop_id,product_name,quantity,seller,buyer,status,price) VALUES(?,?,?,?,?,?,?)",
          [id, product, quantity, seller, userAccount, "open", price],
          (err, result) => {
            if (result) {
              res.send("Successfully Bought by retailer");
            }
          }
        );
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.put("/paidUpdate/:lotId", (req, res) => {
  const id = req.params["lotId"];
  db.query(
    "UPDATE  farmer_brodcast SET status = ? WHERE id = ?",
    ["retailer", id],
    (err, result) => {
      if (result) {
        db.query(
          "UPDATE  offers SET status = ? WHERE crop_id = ?",
          ["paid", id],
          (err, result) => {
            if (result) {
              db.query(
                "UPDATE  insurance SET status = ? WHERE crop_id = ?",
                ["sold", id],
                (err, result) => {
                  if (result) {
                    res.send("Payment done");
                  }
                }
              );
            }
          }
        );
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.delete("/processorBidDelete/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "DELETE  FROM offers WHERE id = ?",
    [id],

    (err, result) => {
      if (result) {
        res.send("Successfully Rejected");
      } else {
        res.send("error,Something went wrong");
      }
    }
  );
});

app.get("/processorBroadcast/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM processor WHERE processor = ? ORDER BY id DESC",
    [id],

    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});

app.get("/processorOrderDetails/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM retailer WHERE seller = ? AND status='yes' ORDER BY id",
    [id],

    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});

app.get("/retailerOrderHistory/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM sales where seller = ? ORDER BY id DESC",
    [id],

    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});

app.get("/getData/:crop", (req, res) => {
  const crop = req.params["crop"];
  db.query(
    "SELECT * FROM users where public_key = (SELECT public_key FROM farmer_brodcast where id = ?)",
    [crop],
    (err, farmer) => {
      if (farmer) {
        db.query(
          "SELECT * FROM users where role = ? LIMIT 1",
          ["qualitychecker"],
          (err, quality) => {
            if (quality) {
              db.query(
                "SELECT * FROM users where public_key = (SELECT buyer FROM orders where crop_id = ?)",
                [crop],
                (err, processor) => {
                  if (processor) {
                    db.query(
                      "SELECT * FROM users where public_key = (SELECT buyer FROM retailer where crop_id = ?)",
                      [crop],
                      (err, retailer) => {
                        if (retailer) {
                          db.query(
                            "SELECT * FROM users where public_key IN (SELECT DISTINCT(buyer) FROM sales where crop_id = ?)",
                            [crop],
                            (err, customer) => {
                              if (customer) {
                                const response = [
                                  farmer,
                                  quality,
                                  processor,
                                  retailer,
                                  customer,
                                ];
                                res.send(response);
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

app.get("/getInvestments", (req, res) => {
  db.query(
    "SELECT * FROM loan WHERE status = ? ORDER BY id DESC",
    ["paid"],
    (err, investments) => {
      if (investments) {
        res.send(investments);
      } else {
        res.send(false);
      }
    }
  );
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params["id"];
  db.query("SELECT * FROM users where public_key = ?", [id], (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  });
});

app.get("/countofusers", (req, res) => {
  db.query("SELECT COUNT(id) as count FROM users", (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  });
});

app.get("/getAllCrops", (req, res) => {
  db.query(
    "SELECT id from farmer_brodcast ORDER BY id DESC LIMIT 10",
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("server is running");
});
