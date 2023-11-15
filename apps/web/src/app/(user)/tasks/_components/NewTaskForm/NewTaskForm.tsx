"use client";
import {
  Button,
  TextArea,
  Card,
  TextField,
  Flex,
  Heading,
  Text,
  Box,
} from "@radix-ui/themes";

export type NewTaskFormData = {
  title: string;
  description: string;
};

export function NewTaskForm({
  onSubmit,
}: {
  onSubmit(data: NewTaskFormData): Promise<void>;
}) {
  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const { title, description } = e.target as any;
          onSubmit({
            title: title.value,
            description: description.value,
          });
        }}
      >
        <Flex direction="column" gap="3">
          <Heading size="2">New Task</Heading>
          <Box>
            <Text color="gray">Title</Text>
            <TextField.Root>
              <TextField.Input name="title" />
            </TextField.Root>
          </Box>
          <Box>
            <Text color="gray">Description</Text>
            <TextArea name="description" />
          </Box>
          <Button type="submit" color="green">
            Create
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
