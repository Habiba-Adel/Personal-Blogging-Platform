const bcrypt = require("bcryptjs");

const AppError = require("../utils/AppError");
const generateToken = require("../utils/generateToken");

const userRepository = require("../repositories/user.repository");

const register = async ({ name, email, password }) => {
  const existingUser =
    await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new AppError(
      "User already exists",
      400
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user =
    await userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

  return user;
};

const login = async ({ email, password }) => {
  const user =
    await userRepository.findUserByEmail(email);

  if (!user) {
    throw new AppError(
      "Invalid credentials",
      401
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    throw new AppError(
      "Invalid credentials",
      401
    );
  }

  const token = generateToken(
    user.id,
    user.email
  );

  return {
    token,
    user,
  };
};

module.exports = {
  register,
  login,
};