import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { UserCache } from '@service/redis/user.cache';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { addImageSchema } from '@image/schemes/images';
import { uploads } from '@global/helpers/cloudinary-upload';
import { UploadApiResponse } from 'cloudinary';
import { BadRequestError } from '@global/helpers/error-handler';
import { IUserDocument } from '@user/interfaces/user.interface';
import { socketIOImageObject } from '@socket/image';
import { imageQueue } from '@service/queues/image.queue';
import { IBgUploadResponse } from '@image/interfaces/image.interface';
import { Helpers } from '@global/helpers/helpers';

const userCache: UserCache = new UserCache();

export class Add {
  @joiValidation(addImageSchema)
  public async profileImage(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body.image) {
        throw new BadRequestError('Image data is required');
      }

      // Generate a safe public_id without special characters
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 10000);
      const safePublicId = `profile_${req.currentUser!.userId}_${timestamp}_${randomNum}`;

      console.log('Starting image upload with public_id:', safePublicId);
      const result: UploadApiResponse = (await uploads(
        req.body.image,
        safePublicId,
        true,
        true
      )) as UploadApiResponse;

      console.log('Upload result:', { public_id: result?.public_id, version: result?.version });

      if (!result?.public_id) {
        console.error('Upload failed - no public_id in result:', result);
        throw new BadRequestError('File upload: Error occurred. Try again.');
      }

      const url = `https://res.cloudinary.com/dxsuaev5w/image/upload/v${result.version}/${result.public_id}`;
      console.log('Generated URL:', url);

      const cachedUser: IUserDocument = (await userCache.updateSingleUserItemInCache(
        `${req.currentUser!.userId}`,
        'profilePicture',
        url
      )) as IUserDocument;
      socketIOImageObject.emit('update user', cachedUser);
      imageQueue.addImageJob('addUserProfileImageToDB', {
        key: `${req.currentUser!.userId}`,
        value: url,
        imgId: result.public_id,
        imgVersion: result.version.toString(),
      });
      res.status(HTTP_STATUS.OK).json({ message: 'Image added successfully' });
    } catch (error) {
      console.error('Profile image upload error:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw new BadRequestError('File upload: Error occurred. Try again.');
    }
  }

  @joiValidation(addImageSchema)
  public async backgroundImage(req: Request, res: Response): Promise<void> {
    const { version, publicId }: IBgUploadResponse = await Add.prototype.backgroundUpload(
      req.body.image
    );
    const bgImageId: Promise<IUserDocument> = userCache.updateSingleUserItemInCache(
      `${req.currentUser!.userId}`,
      'bgImageId',
      publicId
    ) as Promise<IUserDocument>;
    const bgImageVersion: Promise<IUserDocument> = userCache.updateSingleUserItemInCache(
      `${req.currentUser!.userId}`,
      'bgImageVersion',
      version
    ) as Promise<IUserDocument>;
    const response: [IUserDocument, IUserDocument] = (await Promise.all([
      bgImageId,
      bgImageVersion,
    ])) as [IUserDocument, IUserDocument];
    socketIOImageObject.emit('update user', {
      bgImageId: publicId,
      bgImageVersion: version,
      userId: response[0],
    });
    imageQueue.addImageJob('updateBGImageInDB', {
      key: `${req.currentUser!.userId}`,
      imgId: publicId,
      imgVersion: version.toString(),
    });
    res.status(HTTP_STATUS.OK).json({ message: 'Image added successfully' });
  }

  private async backgroundUpload(image: string): Promise<IBgUploadResponse> {
    const isDataURL = Helpers.isDataURL(image);
    let version = '';
    let publicId = '';
    if (isDataURL) {
      try {
        const result: UploadApiResponse = (await uploads(image)) as UploadApiResponse;
        if (!result.public_id) {
          throw new BadRequestError(result.message || 'File upload: Error occurred. Try again.');
        }
        version = result.version.toString();
        publicId = result.public_id;
      } catch (error) {
        throw new BadRequestError('File upload: Error occurred. Try again.');
      }
    } else {
      const value = image.split('/');
      version = value[value.length - 2];
      publicId = value[value.length - 1];
    }
    return { version: version.replace(/v/g, ''), publicId };
  }
}
