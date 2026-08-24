/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_WHATSAPP_DISPLAY_NUMBER?: string;
  readonly VITE_COMPANY_NAME?: string;
  readonly VITE_SALES_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
