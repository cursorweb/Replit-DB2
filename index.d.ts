declare module "replitdb2" {
    class Client {
        /**
         * @param options The options
         */
        constructor(options?: {
            /** Custom replit DB URL */
            url?: string;

            /** Set to `true` to see exactly what the library is doing. */
            debug?: boolean;

            /** Customize the file data is being written to in local dev. Defaults to `database.json` */
            localFile?: string;
        });

        /**
         * Gets `key`.
         * @param key The key
         * @param options The options
         */
        get(
            key: string,
            options?: {
                /** Set to `true` to get the value without JSON parsing. */
                raw?: boolean;
                /** Set to `false` to silently fallback to raw value without throwing an error. */
                error?: boolean;
                /** The default value to return if the key doeos not exist. Defaults to `null`. */
                default?: any;
            }
        ): Promise<any | SyntaxError>;

        /**
         * Sets `key` to `value` in the database.
         * @param key The key
         * @param value The value
         * @param options The options
         */
        set(
            key: string,
            value: any,
            options?: {
                /** Set to `true` to set the value without `JSON.stringify` */
                raw?: boolean,
                /** Set to `false` to not write to the key if it already exists. */
                overwrite?: boolean
            }
        ): Promise<void>;

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
         * 
         * @param prefix The prefix of the keys (optional)
         */
        empty(prefix?: string): Promise<void>;

        /**
         * Gets the entire database and returns as an object.
         */
        getAll(): Promise<Record<string, any>>;

        /**
         * Set the object to the database as `key`: `value`.
         * @param obj The object to set
         */
        setAll(
            obj: Record<string, any>,
            options?: {
                /** Set to `true` to have the database be first wiped before setting the values. */
                overwrite: boolean,
                /** Set to `true` to set the values without `JSON.stringify`. */
                raw?: boolean
            }
        ): Promise<void>;

        /**
         * Deletes all the given keys.
         * @param args The keys to delete.
         */
        deleteMultiple(...args: string[]): Promise<void>;

        /**
         * Gets all the keys and their respective values and zips as an array.
         * @returns [key, value]
         */
        zipAll(): Promise<[string, any]>;

        /**
         * Sees if a key exists.
         * @param key The key.
         */
        keyExists(key: string): Promise<boolean>;

        /**
         * Finds a key
         * 
         * The string can be anywhere, not just at the start compared to `list`.
         * 
         * @param query The string to search.
         */
        findKeys(query: string): Promise<string[]>;

        // todo: type aliases
    }

    export = Client;
}