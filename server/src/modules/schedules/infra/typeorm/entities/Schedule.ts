import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import TruckProfile from '@modules/foodtrucks/infra/typeorm/entities/TruckProfile';

@Entity('schedules')
class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  truck_id: string;

  @ManyToOne(() => TruckProfile)
  @JoinColumn({ name: 'truck_id' })
  truck: TruckProfile;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  lat: string;

  @Column()
  lon: string;

  @Column('time with time zone')
  date_start: Date;

  @Column('time with time zone')
  date_end: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Schedule;
