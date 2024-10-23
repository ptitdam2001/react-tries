// Copyright (c) StrangeBee 2024

import { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { axiosFetchedUrlStore } from './axios-fetched-url-store';

export const useCustomQueryOptions = <O extends UseQueryOptions<unknown, unknown, unknown, QueryKey>>(options: O): O => {
    return {
        ...options,
        onSuccess: (data) => {
            axiosFetchedUrlStore.getAndRemove(data);
            return data;
        },
    };
};