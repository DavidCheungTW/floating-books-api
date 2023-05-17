const uploadFile = require('../utils/upload-file');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createItem = async (model, req, res) => {
  try {
    if (model.name === 'Book') {
      const { file } = req;
      if (file) {
        const cover_image = await uploadFile(file);
        req.body.image = cover_image;
      } else {
        req.body.image = '';
      }
    }
    const row = await model.create(req.body);
    return res.status(201).json(row);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getAllItem = async (model, req, res) => {
  const { query, sort } = req;
  const newQuery = query?.query
    ? {
        title: {
          [Op.iLike]: '%' + JSON.parse(query?.query).title + '%',
        },
      }
    : {};

  if (query?.sort) {
    const newObj = JSON.parse(query?.sort);
    const key = Object.keys(newObj)[0];
    const value = Object.values(newObj)[0];
    newSort = [[key, value === 1 ? 'ASC' : 'DESC']];
  } else {
    newSort = [];
  }

  let rows;
  try {
    switch (model.name) {
      case 'Book':
        rows = await model.findAll({
          where: newQuery,
          order: newSort,
          include: ['genre', 'donator', 'owner'],
        });
        break;
      case 'Favourite':
      case 'Order':
        rows = await model.findAll({
          include: { all: true, nested: true },
        });
        break;
      default:
        rows = await model.findAll();
    }
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.searchItem = async (model, req, res) => {
  let rows;
  try {
    switch (model.name) {
      case 'Book':
        rows = await model.findAll({
          where: req.body,
          include: ['genre', 'donator', 'owner'],
        });
        break;
      case 'Favourite':
      case 'Order':
        rows = await model.findAll({
          where: req.body,
          include: { all: true, nested: true },
        });
        break;
      default:
        rows = await model.findAll({ where: req.body });
    }

    res.status(200).json(rows);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getItem = async (model, req, res) => {
  let row;
  try {
    switch (model.name) {
      case 'Book':
        row = await model.findByPk(req.params.id, {
          include: ['genre', 'donator', 'owner'],
        });
        break;
      case 'Favourite':
      case 'Order':
        row = await model.findByPk(req.params.id, {
          include: { all: true, nested: true },
        });
        break;
      default:
        row = await model.findByPk(req.params.id);
    }
    if (row == null) {
      return res
        .status(404)
        .json({ error: `The ${model.getTableName()} could not be found.` });
    }
    return res.status(200).json(row);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getUserFavourites = async (model, req, res) => {
  const userId = req.params.id;
  try {
    const uniqueBooks = await model.findAll({
      where: { userId },
      include: ['book'],
    });

    if (!uniqueBooks) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(uniqueBooks);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.patchItem = async (model, req, res) => {
  let row;
  try {
    row = await model.findByPk(req.params.id);
    if (row == null) {
      return res
        .status(404)
        .json({ error: `The ${model.getTableName()} could not be found.` });
    }

    await model.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    row = await model.findByPk(req.params.id);

    res.status(200).json(row);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteItem = async (model, req, res) => {
  try {
    const row = await model.findByPk(req.params.id);
    if (row == null) {
      return res
        .status(404)
        .json({ error: `The ${model.getTableName()} could not be found.` });
    }

    await model.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json(err);
  }
};
