declare module "replitdb2" {
    export default class Client {
        /**
         * If you have a custom replit DB URL, you can set it at `options.url`.
         * 
         * For development, you can see exactly what is being set by turning `options.debug` to `true`.
         * 
         * For local dev, you can custom set the file being written. Set `options.localFile`.
         * 
         * @param options The options
         */
        constructor(options?: {
            url?: string,
            debug?: boolean,
            localFile?: string
        });
        
        /**
         * Gets `key`.
         * 
         * If options.raw is set to true, it returns without parsing JSON.
         * 
         * If options.error is set to false, it does not error on failure, merely returning as raw.
         * 
         * If options.default is set, it will be returned if the key does not exist. Defaults to `null`
         * @param key The key
         * @param options The options
         */
        get(key: string, options?: { raw: boolean, error?: boolean, default?: any }): Promise<any | Error>;

        /**
         * Sets `key` to `value` in the database.
         * 
         * If options.raw is set to true, it will set the value verbatim.
         * 
         * If options.overwrite is set to false, the key will not be ovewritten if it already exists.
         * @param key The key
         * @param value The value
         * @param options The options
         */
        set(key: string, value: any, options?: { raw: boolean, overwrite?: boolean }): Promise<void>;

        /**
         * Deletes the key `key`.
         * @param key The key to delete
         */
        delete(key: string): Promise<void>;

        /**
         * List all the keys with `prefix`. If set to empty, it lists all the keys.
         * @param prefix The prefix (optional)
         */
        list(prefix?: string): Promise<string[]>;
        

        /**
         * Removes all the keys in the database.
         */
        empty(): Promise<void>;

        /**
         * Gets the entire database and returns as an object.
         */
        getAll(): Promise<Record<string, any>>;

        /**
         * Set the object to the database as `key`: `value`.
         * 
         * If options.ovewrite is set to true, the database will be only the object.
         * Otherwise, the object is appended to the database.
         * 
         * If options.raw is set to true, all values will be set verbatim.
         * @param obj The object to set
         */
        setAll(obj: Record<string, any>, options?: { overwrite: boolean, raw?: boolean }): Promise<void>;

        /**
         * Deletes all the given keys.
         * @param args The keys to delete.
         */
        deleteMultiple(...args: string[]): Promise<void>;

        /**
         * Gets all the objects as an array:
         * 
         * [key, value]
         */
        zipAll(): Promise<[string, any]>;
    }
}