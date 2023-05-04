module.exports = (sequelize, DataTypes) => {
  const schema = {
    orderDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      validate: {
        notNull: {
          args: [true],
          msg: 'order date must be existed',
        },
        notEmpty: {
          args: [true],
          msg: 'order date must not be empty',
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'request',
    },
    postDate: { type: DataTypes.DATEONLY, defaultValue: '1900-01-01' },
    compDate: { type: DataTypes.DATEONLY, defaultValue: '1900-01-01' },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    comment: { type: DataTypes.STRING, defaultValue: '' },
  };

  return sequelize.define('Order', schema);
};
