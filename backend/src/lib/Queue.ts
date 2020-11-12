import Bull from 'bull';

import redisConfig from '../config/redis';
import ResetPasswordMail from '../app/jobs/ResetPasswordMail';

const jobs = [ResetPasswordMail];

const queues = Object.values(jobs).map(job => ({
  bull: new Bull(job.key, { redis: redisConfig }),
  name: job.key,
  handle: job.handle
}));

export default {
  queues,

  add(name: string, data: {}) {
    const queue = this.queues.find((queue) => queue.name === name);

    if (queue)
      return queue.bull.add(data);
  },

  procces() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);
      
      queue.bull.on('failed', (job, error) => {
        console.error(`Job: ${job}, Failed: ${error}`)
      })
    })
  }

};