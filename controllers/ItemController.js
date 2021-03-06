const express = require("express");
const itemRouter = express.Router();
const {
  saveItem,
  findItems,
  findCompleteItems,
  findIncompleteItems,
  updateItem,
  deleteItem,
} = require("../DAO/ItemDAO");

itemRouter.get("/view", async function (req, res) {
  const complete = req.query.complete;

  let items = await findItems();
  if (complete == 1) {
    items = await findCompleteItems();
  } else if (complete == 0) {
    items = await findIncompleteItems();
  }
  res.json(items);
});

itemRouter.post("/create", async function (req, res) {
  const title = req.body.Title;
  const description = req.body.Description;
  const due = req.body.Due;
  const complete = req.body.Complete;

  const item = await saveItem(title, description, due, complete);
  res.json(item);
});

itemRouter.put("/update", async function (req, res) {
  const id = req.body._id;
  const title = req.body.Title;
  const description = req.body.Description;
  const due = req.body.Due;
  const complete = req.body.Complete;

  const item = await updateItem(id, title, description, due, complete);
  res.json(item);
});

itemRouter.delete("/delete/:id", async function (req, res) {
  const id = req.params.id;
  const item = await deleteItem(id);

  res.json(item);
});

module.exports = itemRouter;
