import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Car } from "./Car";

@Entity('categories')
class Category {
    @PrimaryColumn({ type: "uuid" })
    id?: string;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    description: string;

    @OneToMany(() => Car, car => car.category)
    cars?: Car[];

    @CreateDateColumn({ type: "timestamp", default: "now()" })
    created_at: Date;

    constructor(){
        if(!this.id) {
            this.id = uuidV4();
        } 
    }
};

export { Category };