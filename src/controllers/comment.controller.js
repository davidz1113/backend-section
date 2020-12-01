let _commetService = null;
class CommentController {
  constructor({ CommentService }) {
    _commetService = CommentService;
  }

  async get(req, res) {
    const { commentId } = req.params; // myapi.com/comment/asd3434
    const comment = await _commetService.get(commentId);
    return res.send(comment);
  }

  async update(req, res) {
    const { body } = req;
    const { commentId } = req.params;
    const updateComment = await _commetService.update(commentId, body);
    return res.send(updateComment);
  }

  async delete(req, res) {
    const { commentId } = req.params;
    const deleteComment = await _commetService.delete(commentId);
    return res.send(deleteComment);
  }

  async getIdeasComments(req, res) {
    const { ideaId } = req.params;
    const comments = await _commetService.getIdeasComments(ideaId);
    return res.send(comments);
  }

  async createComment(req, res) {
    const { body } = req;
    const { ideaId } = req.params;
    const { _id: userId } = req.user;
    const createdComment = await _commetService.createComment(body, ideaId, userId);
    return res.status(201).send(createdComment);
  }
}

module.exports = CommentController;
