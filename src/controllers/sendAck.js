const nodemailer = require('nodemailer');

exports.sendAck = async (req, res) => {
  const config = {
    service: 'gmail',
    host: 'stmp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'floatingbooks2022@gmail.com',
      pass: 'gqxwpphymxjzfxuu',
    },
  };

  const transporter = nodemailer.createTransport(config);

  await transporter.sendMail(req.body, (err, info) => {
    if (err) {
      res.status(400).json({ error: err.response });
    } else {
      res.status(200).json({ message: info.response });
    }
  });
};
