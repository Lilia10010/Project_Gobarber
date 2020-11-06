import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinColumn } from 'typeorm'
import User from './User'

@Entity('appointments')

class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  //function que retorna ql é o mode que ele deve utilizar qndo a variáver for chamada (provider)
  @ManyToOne(() => User )
  //p/ identificar a column do prestador deste agendamento
  @JoinColumn({ name: 'provider_id' }) 
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment