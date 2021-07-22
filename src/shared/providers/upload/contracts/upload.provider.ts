import { SaveFileDTO } from '../dto/saveImage.dto';

export abstract class IUploadProvider {
	abstract saveFile(saveImageDTO: SaveFileDTO): Promise<string>;

	abstract deleteFile(fileId: string): Promise<void>;
}
