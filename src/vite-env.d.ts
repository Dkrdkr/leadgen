/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_ACCESS_CODE: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_ADMIN_EMAIL: string;
  readonly VITE_EMAIL_API_KEY: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
