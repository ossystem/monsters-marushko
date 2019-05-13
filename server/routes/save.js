const models = require('../db/models');
const checkJwt = require('../lib/middlewares/checkJwt');
// const sendEmail = require('../lib/sendEmail');

const save = app => {
  app.post('/save', checkJwt, async (req, res, next) => {
    const email = req.user.name;
    const {answers} = req.body;
    const stepsNumbers = Object.keys(answers);

    let userId;
    let userRecord = await models.user.findOne({
      where: {
        email
      }
    });

    if (!userRecord) {
      try {
        userRecord = await models.user.create({
          email
        });
      } catch (ex) {
        console.error(__filename, ex);
        return next({
          status: 500
        });
      }
    }

    userId = userRecord.get('id');

    const answersRecords = stepsNumbers.reduce((acc, stepNumber) => {
      answers[stepNumber].forEach((value, index) => {
        acc.push({
          stepNumber: parseInt(stepNumber),
          questionNumber: index + 1,
          value: JSON.stringify(value),
          userId
        });
      });

      return acc;
    }, []);

    await models.answer.destroy({
      where: {
        userId
      }
    });

    try {
      await models.answer.bulkCreate(answersRecords);
    } catch (ex) {
      console.error(__filename, ex);
      return next({
        status: 500
      });
    }

    // TODO: Need to format answers and uncomment for sending E-mail
    // sendEmail(email, answers);

    res.json({
      success: true
    });
  });
};

module.exports = save;
