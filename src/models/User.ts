import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date
}

export default User
