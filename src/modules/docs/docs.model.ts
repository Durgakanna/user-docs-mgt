import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'documents', schema: 'public', timestamps: false })
export class Document extends Model<Document> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  filename: string;

  @Column({ type: DataType.STRING, allowNull: false })
  path: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isActive: boolean;
}
