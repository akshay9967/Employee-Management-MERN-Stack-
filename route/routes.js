const express = require("express");
const router = express.Router();
const emp = require("../model/employee");
const access = require("../middleware/access");

router.get("/view", (req, res) => {
  emp
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });
});

router.post("/insert", (req, res) => {
  const { Name, Email, Salary } = req.body;
  console.log(Name, Email, Salary);
  emp
    .findOne({ Email })
    .then((user) => {
      if (user) res.json({ msg: "employee already exist", status: "false" });
      else {
        var newEmp = new emp({
          Name,
          Email,
          Salary,
        });

        newEmp
          .save()
          .then((data) => {
            res.json({ employee: data, status: "true" });
          })
          .catch((err) => {
            throw err;
          });
      }
    })
    .catch((err) => {
      throw err;
    });
});

router.put("/update/:id", (req, res) => {
  emp
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          Name: req.body.Name,
          Email: req.body.Email,
          Salary: req.body.Salary,
        },
      }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });
});

router.delete("/delete/:id", access, (req, res) => {
  emp
    .findOneAndRemove({ _id: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });
});

router.post("/profile/:id", (req, res) => {
  emp
    .findById(req.params.id)
    .then((user) => {
      res.json({ emp: user });
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
