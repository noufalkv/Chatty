import { DoneCallback, Job } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { userService } from '@service/db/user.service';

const log: Logger = config.createLogger('userWorker');

class UserWorker {
  async addUserToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { value } = job.data;
      job.log('Starting to add user to database...');
      await userService.addUserData(value);
      job.progress(50);
      job.log(`User data added: ${value.userId}`);
      job.progress(100);
      job.log('User added to database successfully');
      done(null, job.data);
    } catch (error) {
      job.log(`Error adding user: ${(error as Error).message}`);
      log.error(error);
      done(error as Error);
    }
  }

  async updateUserInfo(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { key, value } = job.data;
      job.log(`Starting to update user info: ${key}`);
      await userService.updateUserInfo(key, value);
      job.progress(50);
      job.log(`User info updated: ${key}`);
      job.progress(100);
      job.log('User info updated successfully');
      done(null, job.data);
    } catch (error) {
      job.log(`Error updating user info: ${(error as Error).message}`);
      log.error(error);
      done(error as Error);
    }
  }

  async updateSocialLinks(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { key, value } = job.data;
      job.log(`Starting to update social links: ${key}`);
      await userService.updateSocialLinks(key, value);
      job.progress(50);
      job.log(`Social links updated: ${key}`);
      job.progress(100);
      job.log('Social links updated successfully');
      done(null, job.data);
    } catch (error) {
      job.log(`Error updating social links: ${(error as Error).message}`);
      log.error(error);
      done(error as Error);
    }
  }

  async updateNotificationSettings(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { key, value } = job.data;
      job.log(`Starting to update notification settings: ${key}`);
      await userService.updateNotificationSettings(key, value);
      job.progress(50);
      job.log(`Notification settings updated: ${key}`);
      job.progress(100);
      job.log('Notification settings updated successfully');
      done(null, job.data);
    } catch (error) {
      job.log(`Error updating notification settings: ${(error as Error).message}`);
      log.error(error);
      done(error as Error);
    }
  }
}

export const userWorker: UserWorker = new UserWorker();
