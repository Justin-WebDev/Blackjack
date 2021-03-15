const express = require("express");
const path = require("path");
const cors = require("cors");

const app: { [key: string]: any } = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "/../dist")));

// app.get("/api", (req: any, res: any) => {
//   res.send("Working!");
// });

app.use("*", (req: any, res: any) => {
  res.sendFile(path.join(path.join(__dirname, "/../dist/", "index.html")));
});

const PORT: number = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
