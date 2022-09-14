import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('specifications')
class Specification {
    @PrimaryColumn({ type: "uuid" })
    id?: string;

    @Column({ type: "varchar", length: 30 })
    name: string;

    @Column({ type: "varchar", length: 300 })
    description: string;

    @CreateDateColumn({ type: "date" })
    created_at: Date;

    constructor(){
        if(!this.id) {
            this.id = uuidV4();
        } 
    }
};

export { Specification };