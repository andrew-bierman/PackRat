declare module 'cloudflare:test' {
  // Controls the type of `import("cloudflare:test").env`
  interface ProvidedEnv extends Env {
    TEST_MIGRATIONS: D1Migration[]; // Defined in `vitest.config.ts`
    DB: D1Database;
  }

  export const env: ProvidedEnv;

  // Add a declaration for applyD1Migrations because it's not exported by default and we need to use it in `apply-migrations.ts`
  export function applyD1Migrations(
    db: D1Database,
    migrations: D1Migration[],
  ): Promise<void>;
}
