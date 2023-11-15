"use client";
import { Text, Card, Heading, Flex, Badge, Select } from "@radix-ui/themes";
import { FragmentType, useFragment } from "@/generated/graphql";
import { TaskFragmentDocument } from "./TaskCard.graphql";

export function TaskCard(props: {
  task: FragmentType<typeof TaskFragmentDocument>;
  statuses: string[];
  onStatusChanged?(data: { id: string; status: string }): void;
}) {
  const task = useFragment(TaskFragmentDocument, props.task);
  return (
    <Card>
      <Flex justify="between">
        <Heading>{task.title}</Heading>
        <Select.Root
          defaultValue={task.status}
          onValueChange={(value) =>
            props.onStatusChanged?.({ id: task.id, status: value })
          }
        >
          <Select.Trigger>
            <Badge>{task.status}</Badge>
          </Select.Trigger>
          <Select.Content position="popper">
            {props.statuses.map((status) => (
              <Select.Item key={status} value={status}>
                {status}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
      <Text as="div" color="gray" size="2">
        {task.description}
      </Text>
    </Card>
  );
}
