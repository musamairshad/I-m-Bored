import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    console.log(response.data);
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  var reqType = req.body.type;
  var reqParticipants = req.body.participants;
  try {
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${reqType}&participants=${reqParticipants}`);
    console.log(`Status code: ${response.status}`);
    var responseList = response.data;
    var randomActivity = responseList[Math.floor(Math.random() * responseList.length)];
    res.render("index.ejs", { data: randomActivity });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { errorMessage: "No activities that match your criteria." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
