import Queue, { Job } from 'bull';
import Logger from 'bunyan';
import { ExpressAdapter, createBullBoard, BullAdapter } from '@bull-board/express';
import { config } from '@root/config';
import { IAuthJob } from '@auth/interfaces/auth.interface';
import { IEmailJob, IUserJob } from '@user/interfaces/user.interface';
import { IPostJobData } from '@post/interfaces/post.interface';
import { IReactionJob } from '@reaction/interfaces/reaction.interface';
import { ICommentJob } from '@comment/interfaces/comment.interface';
import { IBlockedUserJobData, IFollowerJobData } from '@follower/interfaces/follower.interface';
import { INotificationJobData } from '@notification/interfaces/notification.interface';
import { IFileImageJobData } from '@image/interfaces/image.interface';
import { IChatJobData, IMessageData } from '@chat/interfaces/chat.interface';

type IBaseJobData =
  | IAuthJob
  | IEmailJob
  | IPostJobData
  | IReactionJob
  | ICommentJob
  | IFollowerJobData
  | IBlockedUserJobData
  | INotificationJobData
  | IFileImageJobData
  | IChatJobData
  | IMessageData
  | IUserJob;

let bullAdapters: BullAdapter[] = [];
export let serverAdapter: ExpressAdapter;

export abstract class BaseQueue {
  queue: Queue.Queue;
  log: Logger;

  constructor(queueName: string) {
    this.queue = new Queue(queueName, `${config.REDIS_URL}`);

    const bullAdapter = new BullAdapter(this.queue);
    bullAdapters.push(bullAdapter);
    bullAdapters = [...new Set(bullAdapters)];
    serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/queues');

    createBullBoard({
      queues: bullAdapters,
      serverAdapter
    });

    this.log = config.createLogger(`${queueName}Queue`);

    this.queue.on('completed', (job: Job) => {
      const logMessage = `Job ${job.id} completed successfully`;
      this.log.info(logMessage);
      // Add log to job.log array for Bull Board display
      job.log(logMessage);
      // Keep completed jobs in history for Bull Board visualization
      // Remove after a delay (24 hours) instead of immediately
      setTimeout(() => {
        job.remove();
      }, 24 * 60 * 60 * 1000);
    });

    this.queue.on('global:completed', (jobId: string) => {
      this.log.info(`Job ${jobId} completed`);
    });

    this.queue.on('global:stalled', (jobId: string) => {
      this.log.info(`Job ${jobId} is stalled`);
    });

    this.queue.on('active', (job: Job) => {
      const logMessage = `Job ${job.id} started processing`;
      this.log.info(logMessage);
      job.log(logMessage);
    });

    this.queue.on('progress', (job: Job, progress: number) => {
      const logMessage = `Job ${job.id} progress: ${progress}%`;
      this.log.info(logMessage);
      job.log(logMessage);
    });

    this.queue.on('failed', (job: Job, error: Error) => {
      const logMessage = `Job ${job.id} failed: ${error.message}`;
      this.log.error(logMessage);
      job.log(logMessage);
    });

    this.queue.on('error', (error: Error) => {
      this.log.error(`Queue error: ${error.message}`);
    });

    this.queue.on('waiting', (jobId: string) => {
      this.log.info(`Job ${jobId} is waiting`);
    });

    this.queue.on('paused', () => {
      this.log.info('Queue paused');
    });

    this.queue.on('resumed', () => {
      this.log.info('Queue resumed');
    });
  }

  protected addJob(name: string, data: IBaseJobData): void {
    this.queue.add(name, data, { attempts: 3, backoff: { type: 'fixed', delay: 5000 } });
  }

  protected processJob(name: string, concurrency: number, callback: Queue.ProcessCallbackFunction<void>): void {
    this.queue.process(name, concurrency, callback);
  }
}
