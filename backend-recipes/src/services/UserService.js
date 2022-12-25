import pool from "../models/pg.js";

class UserService {
  create(email, password, username) {
    const query = 'INSERT INTO users (email, password, username) VALUES ($1,$2, $3)';
    const values = [email, password, username];
    return pool.query(query, values);
  }

  async findUser(email) {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    return user.rows[0];
  }

  async findAll() {
    const users = await pool.query('SELECT * FROM users')
    return users.rows;
  }
}

export default new UserService();
