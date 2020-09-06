import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('truck_profiles')
class TruckProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

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

  @Column('text', { array: true })
  photo_filename: string[];

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
}

export default TruckProfile;
