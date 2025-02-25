import { Module } from '@nestjs/common';
import { Document } from './docs.model';
import { DocumentService } from './docs.service';
import { DocumentController } from './docs.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Document])],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
