import jwt from 'jsonwebtoken';

export const createToken = (data) => {
  const token = jwt.sign(data, process.env.SEC_KEY, { expiresIn: '1h' });
  return token;
};
