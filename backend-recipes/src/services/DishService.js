import pool from "../models/pg.js";

class DishService {
  async create(dish, dishImageName, stepImages) {
    try {
      let query = "INSERT INTO dishes (title, picture, description, created, user_id) VALUES ($1,$2,$3,$4,$5) RETURNING id";
      let values = [dish.title, dishImageName, dish.description, new Date(), dish.user_id];
      const res = await pool.query(query, values);
      const dish_id = res.rows[0].id;

      const promises = [];
      for (let i = 0; i < dish.recipes.length; i++) {
        const recipe = dish.recipes[i];
        query = "INSERT INTO recipes (order_number, ingredient_id, quantity, measure_id, dish_id) VALUES ($1,$2,$3,$4,$5)";
        values = [recipe.order_number, recipe.ingredient_id, recipe.quantity, recipe.measure_id, dish_id];
        promises.push(pool.query(query, values));
      }
      for (let num_step in dish.steps) {
        const step = dish.steps[num_step];
        query = "INSERT INTO steps (step_number, picture, description, dish_id) VALUES ($1,$2,$3,$4)";
        values = [step.step_number, stepImages[num_step], step.description, dish_id];
        promises.push(pool.query(query, values));
      }

      let results = await Promise.all(promises);

      return results;
    } catch (e) {
      console.log(e);
    }
  }

  async getAllDishes(start, items) {
    const dishes = await pool.query(`
      SELECT D.*, U.avatar, U.username 
      FROM dishes AS D 
      JOIN users AS U
      ON D.user_id = U.id
      ORDER BY id DESC
      LIMIT $1 OFFSET $2
    `, [items, start]);
    return dishes.rows;
  }

  async getOneDish(id) {
    const dish = await pool.query(`
    SELECT D.*, U.username, U.avatar
    FROM 
      (SELECT * 
        FROM dishes AS D 
        WHERE D.id = $1) AS D
    JOIN users AS U 
      ON D.user_id = U.id
  `, [id]);

    return dish.rows[0];
  }

  async getCountDishes() {
    const count = await pool.query(`SELECT count(*) FROM dishes;`);
    console.log("count")
    console.log(count.rows[0].count)
    return count.rows[0].count;
  }

  async update(dish, picture) {
    if (!dish.id) {
      throw new Error("не указан ID");
    }
    const query = `UPDATE dishes SET title = $1, picture = $2, description = $3 WHERE id = $4`;
    const value = [dish.title, picture, dish.description, dish.id];
    return pool.query(query, value);
  }

  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    return pool.query("DELETE FROM dishes WHERE id = $1", [id]);
  }

  //-----------MEASURES------------
  async getAllMeasures() {
    const measures = await pool.query("SELECT * FROM measures");
    return measures.rows;
  }

  //-----------INGREDIENTS------------
  async getAllIngredients() {
    const measures = await pool.query("SELECT * FROM ingredients");
    return measures.rows;
  }
  
  async getAllDishesIngredients() {
    const recipes = await pool.query(`
      SELECT R.dish_id, R.order_number, I.name
      FROM recipes AS R 
      JOIN ingredients AS I 
      ON R.ingredient_id = I.id
    `);
    return recipes.rows;
  }

  //-----------RECIPES------------
  async getRecipes(id) {
    const recipes = await pool.query(`
      SELECT 
        R.id, 
        R.order_number, 
        R.quantity,
        I.name as ingredient,
        M.name as measure
      FROM (SELECT *
            FROM recipes AS R 
            WHERE R.dish_id = $1) as R
      JOIN ingredients AS I ON R.ingredient_id = I.id
      JOIN measures AS M ON R.measure_id = M.id
      ORDER BY order_number
    `, [id]);

    return recipes.rows;
  }

  //-----------STEPS------------
  async getSteps(id) {
    const steps = await pool.query(`SELECT * FROM steps WHERE steps.dish_id = $1`, [id]);
    return steps.rows;
  }

}

export default new DishService();
