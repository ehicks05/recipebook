import { Cron, scheduledJobs } from 'croner';
import { createBackup } from '@/scripts/create-backup/create-backup';
import { featureRecipe } from './feature-recipe';

const JOBS = {
	featuredRecipeJob: { pattern: '0 0 * * *', fn: featureRecipe },
	backupDbJob: { pattern: '0 0 * * *', fn: createBackup },
};

if (process.env.NODE_ENV === 'development') {
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
}
