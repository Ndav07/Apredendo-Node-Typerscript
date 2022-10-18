import { Car } from "../infra/typeorm/entities/Car";

interface ICreateCarImagesDTO {
    car: Car;
    image_name: string;
}


interface ICarsImagesRepository {
    create(data: ICreateCarImagesDTO): Promise<void>;
};

export { ICarsImagesRepository, ICreateCarImagesDTO };