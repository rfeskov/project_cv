import { claimNextGenerationJob, completeGenerationJob, failGenerationJob } from '@/lib/job-queue';

async function runOnce() {
  const job = await claimNextGenerationJob();
  if (!job) return false;
  try {
    // Placeholder worker: heavy generation can be moved here from the sync API.
    // In production, call the same AI orchestration functions used by /api/ai/generate.
    await completeGenerationJob(job.id, { ok: true, processedAt: new Date().toISOString(), input: job.input });
    return true;
  } catch (error) {
    await failGenerationJob(job.id, error);
    return true;
  }
}

async function main() {
  console.log('Generation worker started');
  while (true) {
    const processed = await runOnce();
    await new Promise((resolve) => setTimeout(resolve, processed ? 250 : 2000));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
