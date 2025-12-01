import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

export function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve, reject) => {
    console.log('Cloudinary upload starting with config:', {
      public_id,
      overwrite,
      invalidate,
      fileLength: file ? file.length : 0,
      fileType: file ? file.substring(0, 50) : 'N/A',
    });

    cloudinary.v2.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate,
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          console.log('Cloudinary upload success:', {
            public_id: result?.public_id,
            version: result?.version,
          });
          resolve(result);
        }
      }
    );
  });
}

export function videoUpload(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve, reject) => {
    console.log('Cloudinary video upload starting with config:', {
      public_id,
      overwrite,
      invalidate,
      fileLength: file ? file.length : 0,
    });

    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: 'video',
        chunk_size: 50000,
        public_id,
        overwrite,
        invalidate,
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          console.error('Cloudinary video upload error:', error);
          reject(error);
        } else {
          console.log('Cloudinary video upload success:', {
            public_id: result?.public_id,
            version: result?.version,
          });
          resolve(result);
        }
      }
    );
  });
}
