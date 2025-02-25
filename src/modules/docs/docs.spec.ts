import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './docs.controller';
import { DocumentService } from './docs.service';
import { BadRequestException } from '@nestjs/common';

describe('DocumentController', () => {
  let documentController: DocumentController;
  let documentService: DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        {
          provide: DocumentService,
          useValue: {
            uploadDocument: jest.fn(),
            getAllDocuments: jest.fn(),
            getDocument: jest.fn(),
            deleteDocument: jest.fn(),
          },
        },
      ],
    }).compile();

    documentController = module.get<DocumentController>(DocumentController);
    documentService = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(documentController).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should throw BadRequestException if no file is uploaded', async () => {
      await expect(documentController.uploadFile(null)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should call documentService.uploadDocument with the file', async () => {
      const file = { originalname: 'test.pdf', buffer: Buffer.from('test') };
      jest.spyOn(documentService, 'uploadDocument').mockResolvedValue({
        key: 'aaa',
        Location: 'http://localhost:8000/user.jpeg',
      } as any);

      expect(await documentController.uploadFile(file)).toBe('file uploaded');
      expect(documentService.uploadDocument).toHaveBeenCalledWith(file);
    });
  });

  describe('getAll', () => {
    it('should return all documents', async () => {
      const result = ['doc1', 'doc2'];
      jest.spyOn(documentService, 'getAllDocuments').mockResolvedValue(result);

      expect(await documentController.getAll()).toBe(result);
    });
  });

  describe('getOne', () => {
    it('should return a document by id', async () => {
      const result = { id: 1, name: 'doc1' };
      jest
        .spyOn(documentService, 'getDocument')
        .mockResolvedValue(result as any);
      expect(await documentController.getOne(1)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a document by id', async () => {
      jest
        .spyOn(documentService, 'deleteDocument')
        .mockResolvedValue(undefined);

      expect(await documentController.delete(1)).toBeUndefined();
      expect(documentService.deleteDocument).toHaveBeenCalledWith(1);
    });
  });
});
