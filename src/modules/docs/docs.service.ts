// import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { Document } from './docs.model';

// @Injectable()
// export class DocumentService {
//   constructor(@Inject(Document) private readonly documentModel: Document) {}

//   async uploadDocument(filename: string, path: string) {
//     return this.documentRepo.createDocument(filename, path);
//   }

//   async getAllDocuments() {
//     return this.documentRepo.findAll();
//   }

//   async getDocument(id: number) {
//     const doc = await this.documentRepo.findOne(id);
//     if (!doc) {
//       throw new NotFoundException('Document not found');
//     }
//     return doc;
//   }

//   async deleteDocument(id: number) {
//     return this.documentRepo.delete(id);
//   }

//   async updateDocument(id: number, filename?: string, path?: string) {
//     const document = await this.documentRepo.findOne(id);
//     if (!document) {
//       throw new NotFoundException('Document not found');
//     }
  
//     if (filename) document.filename = filename;
//     if (path) document.path = path;
  
//     return this.documentRepo.save(document);
//   }
// }
