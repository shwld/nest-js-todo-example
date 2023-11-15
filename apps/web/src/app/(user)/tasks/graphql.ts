import { graphql } from "@/generated/graphql";

export const MyTasksQueryDocumentKey = "UserTasks_GetMyTasks";
export const MyTasksQueryDocument = graphql(/* GraphQL */ `
  query UserTasks_GetMyTasks {
    viewer {
      tasks {
        ...UserTasks_TaskCard
      }
      taskStatuses
    }
  }
`);

export const CreateTaskMutationDocument = graphql(`
  mutation UserTasks_CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
    }
  }
`);

export const UpdateTaskStatusMutationDocument = graphql(`
  mutation UserTasks_UpdateTaskStatus($input: UpdateTaskStatusInput!) {
    updateTaskStatus(input: $input) {
      id
      status
    }
  }
`);
