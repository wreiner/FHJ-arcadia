import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}

// user.type.ts
// interface User {
//   id?: number;
//   name: string;
// }

export interface UserEntity {
  id?: number;
  name: string;
}

export default User;
