import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
    filename: string;
};

class UploadCarImagesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const imagens = req.files as IFiles[];

        const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

        const images_name = imagens.map((file) => file.filename);

        await uploadCarImagesUseCase.execute({ car: id, images_name });
        return res.status(201).send();
    }
};

export { UploadCarImagesController };