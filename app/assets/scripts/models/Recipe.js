import axios from 'axios';
import {key} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            alert(error);
        }
    }
    calcTime() {
        // Assuming that we need 15 minutes for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit, units[index]);
            });

            // 2) Remove parantheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            const arrIngr = ingredient.split(' ');
            const unitIndex = arrIngr.findIndex(el2 => unitsShort.includes(el2));
            
            let objIngr; 
            if (unitIndex > -1) {
                // There is an unit
                const arrCount = arrIngr.slice(0, unitIndex); // example 4 1/2 cups, arrCount = 4 1/2

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIngr[0].replace('-', '+'));
                } else {
                    count = eval(arrIngr.slice(0, unitIndex).join('+'));
                }
                objIngr = {
                    count,
                    unit: arrIngr[unitIndex],
                    ingredient: arrIngr.slice(unitIndex + 1).join(' ')
                }
            } else if (parseInt(arrIngr[0], 10)) {
                // There is no unit, but the first element is a number
                objIngr = {
                    count: parseInt(arrIngr[0], 10),
                    unit: '',
                    ingredient: arrIngr.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is no unit and no number in 1st position
                objIngr = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIngr;
        });
        this.ingredients = newIngredients;
    }

    updateServings(type) {
        // Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings); 
        });

        this.servings = newServings;
    }
}