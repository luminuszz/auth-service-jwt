/* eslint-disable @typescript-eslint/no-empty-interface */
declare interface EnvVariables {
	DB_PORT: string;
	DB_USER: string;
	DB_NAME: string;
	DB_PASSWORD: string;
	DB_HOST: string;
	API_PORT: string;
	NODE_ENV: 'development' | 'production';
	DATABASE_URL: string;
	API_ADDRESS: string;
}
