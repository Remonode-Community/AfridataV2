import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { hash } from "bcrypt";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column()
  email: string

  @Column()
  password: string

  @BeforeInsert()
  async hashPassword(){
    this.password = await hash(this.password, 10)
    console.log(this.password)
  }
}