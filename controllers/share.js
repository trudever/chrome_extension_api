// const shareRouter = require("express").Router();
// const { tokenExtractor, userExtractor } = require("../utils/middleware");

// shareRouter.post(
//   "/",
//   tokenExtractor,
//   userExtractor,
//   async (request, response) => {
//     const { username, url } = request.body;

//     const note = await Note.findById(noteId);

//     if (!note) {
//       return response.status(404).json({
//         error: "note not found",
//       });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return response.status(404).json({
//         error: "user not found",
//       });
//     }

//     if (!user.sharedNotes.includes(noteId)) {
//       user.sharedNotes = user.sharedNotes.concat(noteId);
//       await user.save();
//     }

//     response.status(200).end();
//   }
// );

// module.exports = shareRouter;
