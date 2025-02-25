import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './docs.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {}))
  async uploadFile(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.documentService.uploadDocument(file);
  }

  @Get()
  async getAll() {
    return this.documentService.getAllDocuments();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.documentService.getDocument(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.documentService.deleteDocument(id);
  }
}
