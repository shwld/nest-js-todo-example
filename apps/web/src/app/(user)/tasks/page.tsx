import { Container, Flex, Heading } from "@radix-ui/themes";
import { getClient } from "@/lib/auth/server/apollo";
import {
  CreateTaskMutationDocument,
  MyTasksQueryDocument,
  MyTasksQueryDocumentKey,
  UpdateTaskStatusMutationDocument,
} from "./graphql";
import { TaskCard } from "./_components/TaskCard";
import { NewTaskForm, type NewTaskFormData } from "./_components/NewTaskForm";
import { revalidateTag } from "next/cache";

export const revalidate = 5;

export default async function TasksPage() {
  const { data } = await getClient().query({
    query: MyTasksQueryDocument,
    context: {
      next: {
        tags: [MyTasksQueryDocumentKey],
      },
    },
  });

  async function createTask(data: NewTaskFormData) {
    "use server";
    const result = await getClient().mutate({
      mutation: CreateTaskMutationDocument,
      variables: { input: data },
    });

    revalidateTag(MyTasksQueryDocumentKey);
  }

  async function updateTaskStatus(data: { id: string; status: string }) {
    "use server";
    const result = await getClient().mutate({
      mutation: UpdateTaskStatusMutationDocument,
      variables: { input: data },
    });

    revalidateTag(MyTasksQueryDocumentKey);
  }

  const statuses = data.viewer?.taskStatuses ?? [];

  return (
    <main>
      <Container size="2" py="5">
        <Flex direction="column" justify="center" gap="3">
          <NewTaskForm onSubmit={createTask} />
          <Heading>My tasks</Heading>
          {data.viewer?.tasks.map((task, i) => (
            <TaskCard
              key={i}
              task={task}
              statuses={statuses}
              onStatusChanged={updateTaskStatus}
            />
          ))}
        </Flex>
      </Container>
    </main>
  );
}
