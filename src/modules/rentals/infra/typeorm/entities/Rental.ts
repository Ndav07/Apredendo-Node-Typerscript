import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

import { Car } from "../../../../cars/infra/typeorm/entities/Car";
import { User } from "../../../../accounts/infra/typeorm/entities/User";

@Entity("rentals")
class Rental {
    @PrimaryColumn({ type: "uuid" })
    id?: string;

    @Column({ type: "timestamp", default: "now()" })
    start_date: Date;

    @Column({ type: "timestamp", nullable: true })
    end_date?: Date;

    @Column({ type: "timestamp" })
    expected_return_date: Date;

    @Column({ type: "numeric", nullable: true })
    total?: number;

    @OneToOne(() => Car, { onDelete: "SET NULL" })
    @JoinColumn()
    car: Car;

    @OneToOne(() => User, { onDelete: "SET NULL" })
    @JoinColumn()
    user: User;

    @CreateDateColumn({ type: "timestamp", default: "now()" })
    created_at?: Date;

    @Column({ type: "timestamp", default: "now()" })
    updated_at?: Date;

    constructor(){
        if(!this.id) {
            this.id = uuidV4();
        } 
    }
};

export { Rental };