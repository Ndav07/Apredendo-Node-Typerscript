import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, Index, PrimaryColumn } from "typeorm";

@Entity('users')
@Index(["email"], { unique: true })
class User {
    @PrimaryColumn({ type: "uuid" })
    id?: string;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    password: string;

    @Column({ type: "varchar" })
    email: string;

    @Column({ type: "varchar" })
    drive_licence: string;

    @Column({ type: "boolean", default: false })
    isAdmin: boolean;

    @Column({ type: "varchar" })
    avatar: string;

    @CreateDateColumn({ type: "date", nullable: true })
    created_at: Date;

    constructor(){
        if(!this.id) {
            this.id = uuidV4();
        } 
    }
};

export { User };