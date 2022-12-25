import { UserService } from "../services/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateAccessToken = (id, email) => {
  const payload = {
    id,
    email,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1y" });
};

class UserController {
  async registration(req, res) {
    try {
      const { email, password, username } = req.body;
      if (!email || !password) {
        return res.status(404).json({ message: "Пустое поле почты или пароля" });
      }
      const candidate = await UserService.findUser(email);
      if (candidate) {
        return res.status(404).json({ message: "Пользователь уже существует" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = await UserService.create(email, hashPassword, username);

      const token = generateAccessToken(user.id, user.email);

      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(500).json(e.message);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(401).json({ message: "Не указан email" });
      }
      const user = await UserService.findUser(email);
      if (!user) {
        return res.status(401).json({ message: "Пользователь не найден" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Указан неверный пароль" });
      }

      const token = generateAccessToken(user.id, user.email);
      return res.json({ token, user });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await UserService.findAll();
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }

  async refreshToken(req, res) {
    try {
      const { id, email } = req.user;
      const token = jwt.generateAccessToken(id, email);
      return res.status(200).json(token);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }
}

export default new UserController();
