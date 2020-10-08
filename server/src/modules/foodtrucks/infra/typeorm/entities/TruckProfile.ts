import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('truck_profiles')
class TruckProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('text', { array: true })
  cuisines: string[];

  @Column('text', { array: true })
  payment_methods: string[];

  @Column()
  catering: boolean;

  @Column()
  photo_filename: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  web: string;

  @Column()
  instagram: string;

  @Column()
  facebook: string;

  @Column()
  twitter: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'photoURL' })
  getPhotoURL(): string | null {
    return this.photo_filename
      ? `${process.env.APP_API_URL}/files/${this.photo_filename}`
      : null;
  }
}

export default TruckProfile;
