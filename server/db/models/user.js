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
    },
    createdAt: {
      type: dataTypes.BIGINT,
      allowNull: false,
      defaultValue: sequelize.literal(`
        ROUND(UNIX_TIMESTAMP(NOW(3)) * 1000)
      `)
    },
    updatedAt: {
      type: dataTypes.BIGINT,
      allowNull: false,
      defaultValue: sequelize.literal(`
        ROUND(UNIX_TIMESTAMP(NOW(3)) * 1000)
      `)
    }
  }, {
    tableName: 'users',
    hooks: {
      beforeUpdate: instance => {
        instance.set('updatedAt', Date.now());
      },
      beforeBulkUpdate ({attributes}) {
        attributes.updatedAt = Date.now();
      }
    },
    indexes: [
      {fields: ['email']}
    ]
  });

  return Model;
};
