import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { User } from "./User";

@Entity("users_tokens")
class UserToken {
    @PrimaryColumn({ type: "uuid" })
    id?: string;

    @Column({ type: "varchar" })
    refresh_token: string;

    @ManyToOne(() => User, user => user.tokens, { onDelete: "CASCADE" })
    user: User;

    @Column({ type: "timestamp" })
    expires_date?: Date;

    @CreateDateColumn({ type: "timestamp", default: "now()" })
    created_at?: Date;

    constructor(){
        if(!this.id) {
            this.id = uuidV4();
        } 
    }
};

export { UserToken };