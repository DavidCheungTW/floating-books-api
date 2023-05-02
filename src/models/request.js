module.exports = (sequelize, DataTypes) => {
  const schema = {
    requestDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      unique: true,
      validate: {
        notNull: {
          args: [true],
          msg: 'request date must be existed',
        },
        notEmpty: {
          args: [true],
          msg: 'request date must not be empty',
        },
      },
    },
    status: DataTypes.STRING,
    postDate: DataTypes.DATEONLY,
    compDate: DataTypes.DATEONLY,
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING,
  };

  return sequelize.define('Request', schema);
};
