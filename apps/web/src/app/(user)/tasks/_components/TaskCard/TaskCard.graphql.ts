import { graphql } from "@/generated/graphql";

export const TaskFragmentDocument = graphql(`
  fragment UserTasks_TaskCard on Task {
    id
    title
    description
    status
  }
`);
