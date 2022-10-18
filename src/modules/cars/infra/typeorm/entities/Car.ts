import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Category } from "./Category";
import { Specification } from "./Specification";
import { CarImage } from "./CarImage";

@Entity('cars')
class Car {
    @PrimaryColumn({ type: "uuid" })
    id?: string;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    description: string;

    @Column({type: "numeric" })
    daily_rate: number;

    @Column({ type: "boolean", default: true })
    available?: boolean;

    @Column({ type: "varchar" })
    license_plate: string;

    @Column({type: "numeric" })
    fine_amount: number;

    @Column({ type: "varchar" })
    brand: string;
    
    @ManyToOne(() => Category, category => category.cars, { nullable: false })
    category: Category;

    @ManyToMany(() => Specification, specifications => specifications.cars, { nullable: true, onDelete: "SET NULL" })
    @JoinTable()
    specifications?: Specification[];

    @OneToMany(() => CarImage, carImage => carImage.car, { nullable: true, onDelete: "SET NULL" })
    carImagens?: CarImage[];

    @CreateDateColumn({ type: "timestamp", default: "now()" })
    created_at: Date;

    constructor(){
        if(!this.id) {
            this.id = uuidV4();
        } 
    }
}

export { Car };