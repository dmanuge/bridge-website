/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_APPLICATION_URL?: string;
  readonly PUBLIC_ANALYTICS_ID?: string;
  readonly CONTACT_DELIVERY_ENDPOINT?: string;
  readonly CONTACT_DELIVERY_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
