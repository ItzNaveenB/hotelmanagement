const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');

function randPassword(letters, numbers, either) {
  var chars = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 
    "0123456789", 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" 
  ];

  function randInt(this_max) { 
    let umax = Math.pow(2, 32);
    let max = umax - (umax % this_max);
    let r = new Uint32Array(1);
    do {
      crypto.getRandomValues(r);
    } while(r[0] > max);
    return r[0] % this_max;
  }

  function randCharFrom(chars) {
    return chars[randInt(chars.length)];
  }

  function shuffle(arr) { 
    for (let i = 0, n = arr.length; i < n - 2; i++) {
        let j = randInt(n - i);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  return shuffle([letters, numbers, either].map(function(len, i) {
    return Array(len).fill(chars[i]).map(x => randCharFrom(x)).join('');
  }).concat().join('').split('')).join('')
}

exports.generateAndStoreUser = async (req, res) => {
  try {
    const { role, name, email } = req.body;
    if (!['admin', 'manager', 'receptionist', 'user'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const username = generateRandomString(8);
    const password = randPassword(8, 4, 2); 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      name,
      email,
      // createdBy: req.user._id 
    });
    await newUser.save();
    await sendEmail(username, password, email, role); 
    res.json({ username, password, role, message: 'User created and stored successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


async function sendEmail(username, password, role) { // Add role parameter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: "naveenbaghel5429@gmail.com",
    subject: 'Your Account Details',
    text: `Hello,\n\nYour account has been successfully created.\nUsername: ${username}\nPassword: ${password}\nRole: ${role}\n\nRegards,\nThe Team`
  };

  await transporter.sendMail(mailOptions);
}

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
