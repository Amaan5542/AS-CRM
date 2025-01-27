const bcrypt = require('bcrypt');

const password = 'Admin1'; // Replace with your desired password
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) throw err;
  console.log('Hashed Password:', hashedPassword);  // Output the hashed password
});
