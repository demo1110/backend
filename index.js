const express = require("express");
const app = express();
const cors = require('cors');
const Port = 5000;

let sampleData = [
  { id: 1, name: "Volvo" },
  { id: 2, name: "Audi" },
  { id: 3, name: "BMW" },
  { id: 4, name: "Honda" },
  { id: 5, name: "Hyundai" },
];
app.use(cors())
app.use(express.json());

// getAllData
app.get("/", (req, res) => {
  res.send( sampleData );
});

//getById
app.get("/getById", (req, res) => {
  console.log("Get by id");
  const id = parseInt(req.query.id);
  console.log(id);
  const data = sampleData.find((el) => el.id === id);
  console.log(data);
  res.send({ data: data });
});

//create
app.post("/", (req, res) => {
  // req.body.name=req.body
  req.body.id = sampleData.length + 1;
  console.log(req.body);
  sampleData.push(req.body);
  res.send({ status: "Created successfully", data: sampleData });
});

//edit
app.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;

  const existingData = sampleData.find((el) => el.id === id);
  if (!existingData) {
    res.status(404).send({ error: "Data not found" });
    return;
  }

  existingData.name = body.name;

  res.send({ status: "Updated successfully", data: existingData });
});

//delete
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  sampleData = sampleData.filter((el) => el.id !== id);
  res.send({ status: "Delete successfully", data: sampleData });
});

app.listen(Port, () => {
  console.log("Port running at " + Port);
});
