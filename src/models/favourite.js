module.exports = (sequelize, DataTypes) => {
  const schema = {
    createDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      validate: {
        notNull: {
          args: [true],
          msg: 'create date must be existed',
        },
        notEmpty: {
          args: [true],
          msg: 'create date must not be empty',
        },
      },
    },
  };

  return sequelize.define('Favourite', schema);
};
