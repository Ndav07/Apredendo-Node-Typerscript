import { Entity, Column, ManyToOne, PrimaryColumn, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Car } from "./Car";

@Entity("cars_image")
class CarImage {
    @PrimaryColumn({ type: "uuid" })
    id?: string;

    @ManyToOne(() => Car, car => car.carImagens, { onDelete: "CASCADE" })
    car: Car;

    @Column({ type: "varchar" })
    image_name: string;

    @CreateDateColumn({ type: "timestamp", default: "now()" })
    created_at: Date;

    constructor(){
        if(!this.id) {
            this.id = uuidV4();
        } 
    }
};

export { CarImage };

