const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

const data = require("../data/db.json"); // Fixed path

// Routes
app.get("/", (req, res) => {
  res.send("Next News API Server!"); // Fixed typo and syntax
});

app.get("/api/news", (req, res) => {
  const { search, category } = req.query;
  let filteredNews = data;

  if (search) {
    const searchText = search.toLowerCase();
    filteredNews = filteredNews.filter((newsItem) => {
      return (
        newsItem.title.toLowerCase().includes(searchText) ||
        newsItem.description.toLowerCase().includes(searchText)
      );
    });
  }

  if (category) {
    const categoryText = category.toLowerCase();
    filteredNews = filteredNews.filter((newsItem) => {
      return newsItem.categories
        ?.map((cat) => cat.toLowerCase())
        .includes(categoryText);
    });
  }

  res.json(filteredNews); // Use res.json() for clarity
});

app.get("/api/news/:id", (req, res) => {
  const newsItem = data.find((item) => item._id === req.params.id); // Fixed _id
  if (!newsItem)
    return res.status(404).send({ message: "News item not found" }); // Fixed status code
  res.json(newsItem);
});

module.exports = app;
