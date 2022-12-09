const noteRouter = require("express").Router();
const Note = require("../models/note");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

noteRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(notes);
});

noteRouter.get("/:id", async (request, response, next) => {
  const blog = await Note.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  if (blog) return response.json(blog);
  response.status(404).end();
});

noteRouter.post(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    if (!request.body.url || !request.body.note)
      return response.status(400).send("note and/or url are missing");
    const user = request.user;
    const newNote = { ...request.body, timestamp: new Date(), user: user._id };
    const note = new Note(newNote);
    const result = await note.save();
    await result.populate("user", { username: 1, name: 1 });
    user.notes = user.notes ? user.notes.concat(result._id) : [result._id];
    await user.save();
    response.status(201).json(result);
  }
);

// noteRouter.put("/:id", async (request, response) => {
//   const updatedNote = await Note.findByIdAndUpdate(
//     request.params.id,
//     request.body,
//     { new: true, runValidators: true, context: "query" }
//   ).populate("user", { username: 1, name: 1 });
//   response.status(200).send(updatedNote);
// });

noteRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const note = await Note.findById(request.params.id);
    if (note.user.toString() !== request.user.id.toString())
      return response.status(401).send("Not authorized");
    await Note.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
);

module.exports = noteRouter;
