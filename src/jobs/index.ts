import { Cron, scheduledJobs } from 'croner';
import { featureRecipe } from './feature-recipe';

const JOBS = {
	featuredRecipeJob: { pattern: '0 0 * * *', fn: featureRecipe },
};

if (process.env.NODE_ENV === 'production') {
	console.log('production detected. setting up jobs.');
	Object.entries(JOBS).forEach(([name, { pattern, fn }]) => {
		const existingJob = scheduledJobs.find(
			(scheduleJob) => scheduleJob.name === name,
		);

		if (existingJob) {
			existingJob.stop();
		}

		const job = new Cron(pattern, fn, { name });
		console.log(`${job.name} next run: ${job.nextRun()}`);
	});
} else {
	console.log('production not detected. not setting up jobs.');
}
