import { graphql } from "@/generated/graphql";

export const CreateUserMutationDocument = graphql(`
  mutation Start_createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`);
