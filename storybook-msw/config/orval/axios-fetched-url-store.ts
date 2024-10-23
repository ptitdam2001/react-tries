const innerStore = new Map<unknown, string>();

/**
 * Workaround static store allowing access to
 * fetched data url from generated code custom hooks.
 *
 * data -> url
 */
export const axiosFetchedUrlStore = {
    getAndRemove: (data: unknown) => {
        const url = innerStore.get(data);

        innerStore.delete(data);

        return url;
    },
    set: (data: unknown, url: string) => {
        innerStore.set(data, url);
    },
    clear: () => innerStore.clear(),
};