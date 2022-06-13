// const bodyParser = require("body-parser");
const express = require("express");
const server = express();
server.use(express.json());

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 1;

// to enable parsing of json bodies for post requests

// TODO: your code to handle requests
const PATH = "/posts"; // TODO: change this to the path you want to use

server.post(PATH, (req, res) => {
  const { author, title, contents } = req.body;
  if (!author || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parametros necesarios para crear el Post",
    });
  }
  //   res.send("done");
  const post = { title, author, contents, id: id++ };
  posts.push(post);
  res.status(200).json(post);
});

server.post(`${PATH}/author/:author`, (req, res) => {
  const { author } = req.params;
  const { title, contents } = req.body;
  if (!author || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parametros necesarios para crear el Post",
    });
  }
  const post = { title, author, contents, id: id++ };
  posts.push(post);
  res.status(200).json(post);
});

server.get(PATH, (req, res) => {
  const { term } = req.query;
  if (term) {
    const filteredPosts = posts.filter(
      (post) => post.title.includes(term) || post.contents.includes(term)
    );
    return res.status(200).json(filteredPosts);
  }
  res.status(200).json(posts);
});

server.get(`${PATH}/:author`, (req, res) => {
  const { author } = req.params;
  const filteredAuthors = posts.filter((post) => post.author === author);
  if (filteredAuthors.length > 0) {
    res.status(200).json(filteredAuthors);
  } else {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post del autor indicado",
    });
  }
});

server.get(`${PATH}/:author/:title`, (req, res) => {
  const { author, title } = req.params;
  const filteredPosts = posts.filter(
    (post) => post.author === author && post.title === title
  );
  if (filteredPosts.length > 0) {
    res.status(200).json(filteredPosts);
  } else {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
  }
});

server.put(PATH, (req, res) => {
  const { id, title, contents } = req.body;
  if (id && title && contents) {
    const post = posts.find((post) => post.id === parseInt(id));
    // const post = { title, author, contents, id: id };
    if (post) {
      post.title = title;
      post.contents = contents;
      res.json(post);
    } else {
      return res.status(STATUS_USER_ERROR).json({
        error: "No existe ningun post con el id indicado",
      });
    }
  } else {
    return res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para actualizar el Post",
    });
  }
});

server.delete(PATH, (req, res) => {
  let { id } = req.body;
  const post = posts.find((post) => post.id === parseInt(id));
  if (!id || !post) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibio el id del post a eliminar",
    });
  }

  posts = posts.filter((post) => post.id !== parseInt(id));
  res.json({ success: true });
});

server.delete('/author' , (req, res) => {
  let {author} = req.body;
  const author_found = posts.find((post) => post.author === author);
  if (!author || !author_found) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe el autor indicado"
    })
  }
  let deleted_author = [];
  deleted_author = posts.filter((post) => post.author === author);
  posts = posts.filter((post) => post.author !== author);

  return res.json(deleted_author)

})


module.exports = { posts, server };
