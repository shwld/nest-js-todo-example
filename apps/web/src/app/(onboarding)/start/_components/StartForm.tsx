"use client";
import { Card, TextField, Flex, Button, Heading } from "@radix-ui/themes";

export default function StartForm({
  onSubmit,
}: {
  onSubmit(username: string): void;
}) {
  return (
    <Card>
      <Heading>ユーザー登録</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const username = (e.target as any).username.value;
          onSubmit(username);
        }}
      >
        <Flex direction="column" gap="3" mt="3">
          <TextField.Root>
            <TextField.Input name="username" placeholder="username" />
          </TextField.Root>
          <Button type="submit">登録</Button>
        </Flex>
      </form>
    </Card>
  );
}
