const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("mstProject.html");
});

router.get("/login", (req, res) => {
  res.render("login.html");
});



router.get("/ppc", (req, res) => {
  res.render("ppc.html");
});

router.get("/ecn", (req, res) => {
  res.render("ecn.html");
});

router.get("/mstDefault", (req, res) => {
  res.render("mstDefault.html");
});

router.get("/reviseHistory", (req, res) => {
  res.render("revise_history.html");
});

router.get("/projectRevise", (req, res) => {
  res.render("project_revise.html");
});

module.exports = router;
