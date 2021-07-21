export abstract class IUploadProvider {
	abstract saveFile(file: Express.Multer.File): Promise<string>;

	abstract deleteFile(fileId: string): Promise<void>;
}
