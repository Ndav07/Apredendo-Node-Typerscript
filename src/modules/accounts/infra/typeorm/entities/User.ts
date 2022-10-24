import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryColumn } from "typeorm";
import { UserToken } from "./UserToken";

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
    drive_license: string;

    @Column({ type: "boolean", default: false })
    isAdmin: boolean;

    @Column({ type: "varchar", nullable: true })
    avatar?: string;

    @OneToMany(() => UserToken, tokens => tokens.user, { nullable: true, onDelete: "SET NULL" })
    tokens?: UserToken[];

    @CreateDateColumn({ type: "timestamp", default: "now()" })
    created_at: Date;

    constructor(){
        if(!this.id) {
            this.id = uuidV4();
        } 
    }
};

export { User };