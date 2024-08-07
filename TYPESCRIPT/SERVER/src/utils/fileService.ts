import path from "path";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';


class FileService {
    save(file: any): string {
        const fileExtension = file.mimetype.split("/")[1]; // Obter a extensão da imagem. (exemplo: JPG, JPEG, PNG, ...)
        const fileName = uuidv4() + "." + fileExtension;
        const filePath = path.resolve("static", fileName);
        file.mv(filePath);
        return fileName;
    }
    delete(fileName: string) {}
}

export default new FileService();
