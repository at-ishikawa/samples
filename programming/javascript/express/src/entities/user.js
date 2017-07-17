import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("int")
    id = undefined;

    @Column("varchar")
    email = "";

    @Column("varchar")
    password = "";

    @CreateDateColumn()
    created_at = undefined;

    @UpdateDateColumn()
    updated_at = undefined;
}
