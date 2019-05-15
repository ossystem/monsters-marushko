module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define('answer', {
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      validate: {
        isUUID: 4
      }
    },
    stepNumber: {
      type: dataTypes.INTEGER(1),
      allowNull: false
    },
    questionNumber: {
      type: dataTypes.INTEGER(1),
      allowNull: false
    },
    value: {
      type: dataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'answers',
    indexes: [
      {fields: ['stepNumber']},
      {fields: ['questionNumber']}
    ]
  });

  Model.associate = models => {
    Model.belongsTo(models.user, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
  };

  return Model;
};
