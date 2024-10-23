
import { useCallback } from 'react';
import { InvalidateQueryFilters, MutationMeta, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { axiosFetchedUrlStore } from './axios-fetched-url-store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCustomMutationOptions = <O extends UseMutationOptions<any, any, any, any>>(options: O): O => {
    const queryClient = useQueryClient();

    const { onSuccess, onError } = options;

    // Check case when 'meta' is used instead of 'metaSdk'
    const metaSdkKeys: (keyof MutationMeta)[] = ['disableDefaultCacheInvalidation', 'invalidateQueries'];
    if (metaSdkKeys.some((key) => key in (options.meta ?? {}))) {
        throw new Error('Mutation option "metaSdk" should be used instead of "meta" for SDK mutations.');
    }

    const { disableDefaultCacheInvalidation, invalidateQueries} =
        options.meta ?? { };

    return {
        ...options,

        /**
         * Invalidate cache for related queries, to keep them up-to-date.
         * Cache invalidation should be made on related item, and lists.
         * Doing so in 'onSuccess' allow to avoid any loading-state on lists etc,
         * making refetchs totally transparent for users.
         *
         * All this logic may be not always sufficient, so some cases should be handled manually.
         *
         * Queries keys are obtained using mutation url, which is somewhat parsed.
         */
        onSuccess: useCallback(
            async (data: unknown, variables, context) => {
                const invalidateCacheDefault = () => {
                    const url = axiosFetchedUrlStore.getAndRemove(data);

                    // Mutation url is decoded in case of variable presence

                    if (!url) {
                        console.error('Unexpected case: fetching url not defined, cache invalidation cannot be done.', {
                            data,
                            variables,
                        });
                        return [];
                    }
                    const decodedUrl = decodeURIComponent(url);

                    // Last part of url is get in case of variable presence

                    const splittedUrl = decodedUrl.split('/');
                    const lastUrlItem = splittedUrl.pop();
                    const decodedBaseUrl = splittedUrl.join('/');

                    if (lastUrlItem === '_bulk' && (invalidateQueries as unknown[])?.length === 0) {
                        console.error(
                            'Bulk mutations are not handled by cache invalidation. You should give queries to invalidate yourself.',
                            { data, variables },
                        );
                        return [];
                    }

                    // Check if this last url part is one of variables

                    const isVariable = Boolean(
                        variables &&
                            lastUrlItem &&
                            decodedBaseUrl &&
                            Object.values(variables).some((value) => String(value) === lastUrlItem),
                    );

                    return [
                        // Remove cache of queries with same url as mutation (like items)
                        queryClient.invalidateQueries({
                            queryKey: [decodedUrl],
                        }),

                        // Remove cache of queries with urls without mutation variable (like lists)
                        isVariable &&
                            queryClient.invalidateQueries({
                                queryKey: [decodedBaseUrl],
                            }),
                    ];
                };

                await Promise.all(
                    [
                        ...(!disableDefaultCacheInvalidation ? invalidateCacheDefault() : []),

                        ...(invalidateQueries === undefined ? [] : invalidateQueries as InvalidateQueryFilters[]).map((filters) => queryClient.invalidateQueries(filters)),
                    ].filter(Boolean),
                );

                

                return onSuccess?.(data, variables, context);
            },
            [disableDefaultCacheInvalidation, invalidateQueries, onSuccess, queryClient],
        ),

        onError: useCallback(
            async (error, variables, context) => {
                

                return onError?.(error, variables, context);
            },
            [onError],
        ),
    };
};