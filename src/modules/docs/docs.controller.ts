// import { Controller, Get, Post, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Put, Body } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { DocumentService } from './docs.service';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

// @Controller('documents')
// export class DocumentController {
//   constructor(private readonly documentService: DocumentService) {}

//   @Post('upload')
//   @UseInterceptors(FileInterceptor('file', {
//     storage: diskStorage({
//       destination: './uploads',
//       filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
//       },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 },
//   }))
//   async uploadFile(@UploadedFile() file: any){
//     if (!file) {
//       throw new BadRequestException('No file uploaded');
//     }
//     return this.documentService.uploadDocument(file.filename, file.path);
//   }

//   @Get()
//   async getAll() {
//     return this.documentService.getAllDocuments();
//   }

//   @Get(':id')
//   async getOne(@Param('id') id: number) {
//     return this.documentService.getDocument(id);
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: number) {
//     return this.documentService.deleteDocument(id);
//   }

// @Put(':id')
// @UseInterceptors(FileInterceptor('file', {
//   storage: diskStorage({
//     destination: './uploads',
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
//     },
//   }),
// }))
// async updateDocument(
//   @Param('id') id: number,
//   // @UploadedFile() file?: Express.Multer.File,
//   @UploadedFile() file?: any,
//   @Body('filename') filename?: string
// ) {
//   return this.documentService.updateDocument(id, filename, file?.path);
// }
// }
