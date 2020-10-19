import TruckProfile from '@modules/foodtrucks/infra/typeorm/entities/TruckProfile';
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

@Entity('menus')
class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  truck_id: string;

  @ManyToOne(() => TruckProfile)
  @JoinColumn({ name: 'truck_id' })
  truck: TruckProfile;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @Column('text', { array: true })
  options: string[];

  @Column()
  photo_filename: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'photo_url' })
  getPhotoUrl(): string | null {
    if (!this.photo_filename) {
      return null;
    }
    return `${process.env.APP_API_URL}/files/${this.photo_filename}`
  }
}

export default Menu;
