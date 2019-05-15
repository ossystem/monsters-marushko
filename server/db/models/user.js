module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define('user', {
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      validate: {
        isUUID: 4
      }
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'users',
    indexes: [
      {fields: ['email']}
    ]
  });

  return Model;
};
