import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { Car } from "./Car";

@Entity('specifications')
class Specification {
    @PrimaryColumn({ type: "uuid" })
    id?: string;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    description: string;
    
    @CreateDateColumn({ type: "timestamp", default: "now()" })
    created_at: Date;

    constructor(){
        if(!this.id) {
            this.id = uuidV4();
        } 
    }
};

export { Specification };