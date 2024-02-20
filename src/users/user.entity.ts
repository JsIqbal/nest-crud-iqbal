import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Index('idx_email', ['email'])
@Index('idx_username', ['username'])
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  first_name: string;
  default: 'null';

  @Column({ default: null })
  last_name: string;
}
