declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    AZURE_AD_CLIENT_SECRET: string;
    AZURE_AD_CLIENT_ID: string;
    AZURE_AD_TENANT_ID: string;
    S3_BUCKET_JCT: string;
    S3_BUCKET_HEARINGS: string;
    S3_ACCESS_KEY: string;
    S3_SECRET_KEY: string;
    NEXT_PUBLIC_S3_HEARINGS_URL_PREFIX: string;
    NEXT_PUBLIC_S3_JCT_URL_PREFIX: string;
  }
}
