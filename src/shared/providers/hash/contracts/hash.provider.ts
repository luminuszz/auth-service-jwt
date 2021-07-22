export abstract class IHashProvider {
	abstract createHash(
		value: string | number,
		salts?: number,
	): Promise<string> | string;

	abstract compare(
		value: string | number,
		hashValue: string,
	): Promise<boolean> | boolean;
}
