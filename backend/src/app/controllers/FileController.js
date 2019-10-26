import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }

  async delete(req, res) {
    const file = await File.findByPk(req.params.fileId);

    if (!file) {
      return res.status(404).json({
        error: 'This file was not found.',
      });
    }

    await File.destroy({
      where: { id: req.params.fileId },
    });

    return res.json();
  }
}

export default new FileController();
