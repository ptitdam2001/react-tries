import { InputTransformerFn } from '@orval/core';
import type { oas30 } from 'openapi3-ts';

const formDataContentType = 'multipart/form-data';

/**
 * Search for requestBody multiple contents,
 * then keep only form-data values,
 * avoiding code generation conflicts.
 */
export const operationsTransformer: InputTransformerFn = (openApiSchema: oas30.OpenAPIObject) => {
    Object.values(openApiSchema.paths)
        .flatMap((route) => [route.post, route.put, route.patch])
        .map((operation) => (operation?.requestBody as oas30.RequestBodyObject | undefined)?.content)
        .forEach((bodyContent) => {
            const keys = Object.keys(bodyContent ?? {});
            if (keys.length < 2 || !keys.includes(formDataContentType)) {
                return;
            }

            keys.filter((key) => key !== formDataContentType).forEach((key) => {
                delete bodyContent![key];
            });
        });

    return openApiSchema;
};