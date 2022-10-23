import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "schema.graphql",
    documents: "./graphql/**/*.graphql",
    generates: {
        "./generated/graphql.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typed-document-node"
            ]
        }
    }
};
export default config;
