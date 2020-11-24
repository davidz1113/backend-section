const { generateToken } = require("../helpers/jwt.helper");
let _userService = null;

class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async signUp(user) {
    const { userName } = user;
    const userExist = await _userService.getUserByUserName(userName);
    if (userExist) {
      const error = new Error();
      error.status = 400;
      error.message = "User already Exists";
      throw error;
    }

    return await _userService.create(user);
  }

  async signIn(user) {
    const { userName, password } = user;
    const userExist = await _userService.getUserByUserName(userName);
    if (!userExist) {
      const error = new Error();
      error.status = 404;
      error.message = "User doesn't exist";
      throw error;
    }

    const validPassword = userExist.comparePassword(password);
    if (!validPassword) {
      const error = new Error();
      error.status = 400;
      error.message = "Invalid Password";
      throw error;
    }

    const userToEncode = {
      userName: userExist.userName,
      id: userExist._id,
    };

    const token = generateToken(userExist);

    return { token, user: userExist };
  }
}

module.exports = AuthService;
