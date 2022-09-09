import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, Unique } from "typeorm";

@Entity('users')
@Index(["email"], { unique: true })
class Users {
    @PrimaryColumn({ type: "uuid" })
    id?: string;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    passaword: string;

    @Column({ type: "varchar" })
    email: string;

    @Column({ type: "varchar" })
    drive_licence: string;

    @Column({ type: "boolean", default: false })
    isAdmin: boolean;

    @CreateDateColumn({ type: "date" })
    created_at: Date;

    constructor(){
        if(!this.id) {
            this.id = uuidV4();
        } 
    }
};

export { Users };