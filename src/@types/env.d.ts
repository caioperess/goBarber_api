/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  export interface ProcessEnv {
    APP_URL?: string;
    APP_PORT?: number;
    NODE_ENV?: string;
    SECRET?: string;
    POSTGRES_USER?: string;
    POSTGRES_PASSWORD?: string;
    POSTGRES_DATABASE_NAME?: string;
    POSTGRES_HOST?: string;
  }
}
