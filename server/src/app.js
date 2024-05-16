import express from "express";

const app = express();

app.use("/", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
