import { Cron } from 'croner';
import { featureRecipe } from './feature-recipe.js';

const job = new Cron('0 0 * * *', () => {
	featureRecipe();
});

console.log(`featureRecipe next running at ${job.nextRun()}`);
