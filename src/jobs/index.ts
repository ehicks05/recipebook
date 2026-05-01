import { Cron } from 'croner';
import { featureRecipe } from './feature-recipe';

const featureRecipeJob = new Cron('0 0 * * *', featureRecipe);

console.log(`featureRecipeJob next run: ${featureRecipeJob.nextRun()}`);
