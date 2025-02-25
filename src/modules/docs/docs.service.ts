import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Document } from './docs.model';

@Injectable()
export class DocumentService {
  AWS_S3_BUCKET = 'demo-docs';
  s3 = new AWS.S3({
    accessKeyId: 'XXXXX',
    secretAccessKey: 'YYYYY',
  });

  constructor(@Inject(Document) private readonly documentModel: Document) {}

  async uploadDocument(file) {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
    );
  }

  async s3_upload(file, bucket, name) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      await this.documentModel.create({
        filename: name,
        path: s3Response?.Location,
        isActive: true,
      } as any);
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }

async getAllDocuments() {
    const files = await this.documentModel.findAll();
    const fetchPromises = files.map(file => this.fetchFileFromS3(file.path));
    return await Promise.all(fetchPromises);
  }
  
  async getDocument(id: number) {
    const file = await this.documentModel.findOne(id);
    if (!file) {
      throw new NotFoundException('Document not found');
    }
    return this.fetchFileFromS3(file.path);
  }
  
  private async fetchFileFromS3(path: string) {
    const s3Key = `${path}`;
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: s3Key,
    };
    return this.s3.getObject(params).promise();
  }
  async deleteDocument(id: number): Promise<void> {
    const file = await this.documentModel.findOne(id);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: `${file.path}`,
    };
    await this.s3.deleteObject(params).promise();
    await file.update({ isActive: false });
  }


  //   async updateDocument(id: number, filename?: string, path?: string) {
  //     const document = await this.documentRepo.findOne(id);
  //     if (!document) {
  //       throw new NotFoundException('Document not found');
  //     }

  //     if (filename) document.filename = filename;
  //     if (path) document.path = path;

  //     return this.documentRepo.save(document);
  //   }
}
