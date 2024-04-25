declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    AZURE_AD_CLIENT_SECRET: string;
    AZURE_AD_CLIENT_ID: string;
    AZURE_AD_TENANT_ID: string;
    S3_UPLOADS_BUCKET: string;
    S3_ACCESS_KEY: string;
    S3_SECRET_KEY: string;
  }
}
