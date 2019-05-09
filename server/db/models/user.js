const crypto = require('crypto');

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
    username: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: dataTypes.STRING,
      allowNull: false
    },
    passwordSalt: {
      type: dataTypes.STRING(64),
      allowNull: false
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
      {fields: ['username']},
      {fields: ['email']}
    ]
  });

  Model.getPasswordHashAndSalt = password => {
    let result = false;

    try {
      password = password.toString().trim();
    } catch (ex) {
      return result;
    }

    let passwordSalt = null;
    let passwordHash = null;

    if (password) {
      try {
        passwordSalt = crypto
          .randomBytes(64)
          .toString('hex')
          .slice(0, 64);

        passwordHash = crypto
          .createHmac('sha512', passwordSalt)
          .update(password)
          .digest('hex');
      } catch (ex) {
        return result;
      }
    }

    if (passwordHash && passwordSalt) {
      result = {
        passwordHash,
        passwordSalt
      };
    }

    return result;
  };

  Model.prototype.isValidPassword = function (password) {
    const {passwordHash, passwordSalt} = this;
    const isValid = false;
    let cryptedPassword = null;

    if (!passwordHash || !passwordSalt) {
      return isValid;
    }

    try {
      password = password.toString();

      cryptedPassword = crypto
        .createHmac('sha512', passwordSalt)
        .update(password)
        .digest('hex');
    } catch (ex) {
      return isValid;
    }

    return passwordHash === cryptedPassword;
  };

  Model.prototype.toJSON = function () {
    const values = {...this.dataValues};

    delete values.passwordHash;
    delete values.passwordSalt;
    delete values.deletedAt;

    return values;
  };

  return Model;
};
