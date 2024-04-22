export default {
    schema: './src/db/schema.ts',
    out: './migrations',
    driver: 'd1',
    dbCredentials: {
        wranglerConfigPath: 'wrangler.toml',
        dbName: 'production',
    },
    verbose: false,
    strict: true,
};
//# sourceMappingURL=drizzle.config.js.map