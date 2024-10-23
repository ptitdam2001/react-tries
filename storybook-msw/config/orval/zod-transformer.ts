import type { oas30 } from 'openapi3-ts';

type Transformer = (
    key: string,
    value: oas30.SchemaObject | oas30.ReferenceObject,
    parents?: (oas30.SchemaObject | oas30.ReferenceObject | undefined)[],
) => void;

export const zodTransformer = (openApiSchema: oas30.OpenAPIObject): oas30.OpenAPIObject => {
    Object.entries(openApiSchema).forEach(([key, value]) => transform(key, value));

    return openApiSchema;
};

const transform: Transformer = (key, value, parents = []) => {
    if (!value || typeof value !== 'object') {
        return;
    }

    fixFileTypes(key, value, parents);
    fixRequiredString(key, value, parents);

    Object.entries(value).forEach(([key, child]) => transform(key, child, [value, ...parents]));
};

/**
 * Fix file types generation in Zod,
 * avoiding requiring 'string()' for file upload,
 * 'any()' will be generated instead
 */
const fixFileTypes: Transformer = (key, value) => {
    if ('format' in value && value.format === 'binary') {
        delete value.type;
    }
};

/**
 * Enforce required string typing, adding a minLength=1 when absent.
 * For form concerns.
 */
const fixRequiredString: Transformer = (key, value, parents = []) => {
    const grandParent = parents[1];

    if ('type' in value && value.type === 'string' && value.minLength === undefined) {
        if (
            grandParent &&
            'required' in grandParent &&
            Array.isArray(grandParent.required) &&
            grandParent.required.includes(key)
        ) {
            value.minLength = 1;
        }
    }
};