import DishService from "../services/DishService.js";
import fileService from "../utils/fileService.js";
import { promises as fs } from "fs";

function getStrDate(dish_date) {
  const date = new Date(dish_date);

  let month;
  switch (date.getMonth()) {
    case 1:
      month = "января";
      break;
    case 2:
      month = "февраля";
      break;
    case 3:
      month = "марта";
      break;
    case 4:
      month = "апреля";
      break;
    case 5:
      month = "мая";
      break;
    case 6:
      month = "июня";
      break;
    case 7:
      month = "июля";
      break;
    case 8:
      month = "августа";
      break;
    case 9:
      month = "сентября";
      break;
    case 10:
      month = "октября";
      break;
    case 11:
      month = "ноября";
      break;
    case 12:
      month = "декабря";
      break;
    default:
      month = "unknown";
      break;
  }

  return `${date.getDate()} ${month} ${date.getFullYear()}`;
}

class DishController {
  async create(req, res) {
    try {
      const { dish } = req.body;
      const files = req.files;
      const dishData = JSON.parse(dish);
      dishData.user_id = req.user.id;

      let dishImageName = null;
      let stepImages = [];
      if (files) {
        if (files.dish_picture) {
          dishImageName = await fileService.saveFile(files.dish_picture, "/images/dishes");
        }
        for (let i = 0; i < dishData.steps.length; i++) {
          console.log(files);
          if (files[`imageStep${i + 1}`]) {
            stepImages[i] = await fileService.saveFile(files[`imageStep${i + 1}`], "/images/steps");
            //TODO: Promise.all
          }
        }
      }
      const result = await DishService.create(dishData, dishImageName, stepImages);
      return res.status(200).json(result);
    } catch (e) {
      console.log(e.message);
      res.status(500).json(e.message);
    }
  }

  async getAllDishes(req, res) {
    try {
      let { start, items } = req.query;
      const dishes_promise = DishService.getAllDishes(Number(start), Number(items));
      //TODO: Можно доставать ингридиенты по одному рецепту
      const ingredientNames_promise = DishService.getAllDishesIngredients();
      const [dishes, ingredientNames] = await Promise.all([dishes_promise, ingredientNames_promise]);
      //TODO: можно для каждого промисв сделать свой then и там обрабатывать свою логику

      console.log(dishes);
      for (let i in dishes) {
        if (dishes[i].picture) {
          const image = await fs.readFile(dishes[i].picture);
          dishes[i].picture = image.toString("base64");
        }
        //TODO: Promise.all?

        dishes[i].created = getStrDate(dishes[i].created);
        dishes[i].ingredients = ingredientNames.filter((ingredient) => ingredient.dish_id === dishes[i].id);
      }

      res.status(200).json(dishes);
    } catch (e) {
      console.log(e.message);
      res.status(500).json(e.message);
    }
  }

  async getCountDishes(req, res) {
    try {
      const count_dishes = await DishService.getCountDishes();
      return res.json({ count: Number(count_dishes) });
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const id = req.params.id;
      const dish = await DishService.getOneDish(id);
      dish.created = getStrDate(dish.created);
      if (dish.picture) {
        const picture = await fs.readFile(dish.picture);
        dish.picture = picture.toString("base64");
      }

      const recipes_promise = DishService.getRecipes(dish.id);
      const steps_promise = DishService.getSteps(dish.id);
      const [recipes, steps] = await Promise.all([recipes_promise, steps_promise]);

      const step_url_promises = steps.map((step) => {
        if (!step.picture) return null;
        return fs.readFile(step.picture);
      });

      const step_pictures = await Promise.all([...step_url_promises]);
      for (let i in steps) {
        step_pictures[i] ? (steps[i].picture = step_pictures[i].toString("base64")) : (steps[i].picture = null);
      }

      dish.recipes = recipes;
      dish.steps = steps;
      return res.status(200).json(dish);
    } catch (e) {
      console.log(e);
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    DishService.update(req.body, req?.files?.picture)
      .then((result) => res.status(200).json(result))
      .catch((e) => res.status(500).json(e.message));
  }

  async delete(req, res) {
    DishService.delete(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((e) => res.status(500).json(e.message));
  }

  async getMeasures(req, res) {
    try {
      const measures = await DishService.getAllMeasures();
      res.status(200).json(measures);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getIngredients(req, res) {
    try {
      const ingredients = await DishService.getAllIngredients();
      res.status(200).json(ingredients);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new DishController();
