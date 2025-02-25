import { Table, Column, Model, DataType } from 'sequelize-typescript';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

@Table({ tableName: 'users', schema: 'public', timestamps: false })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.VIEWER,
  })
  role: UserRole;

  @Column({ type: DataType.STRING })
  refreshToken: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isActive: boolean;
}
