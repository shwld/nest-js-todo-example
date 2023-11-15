import { Text, Container, Card } from "@radix-ui/themes";
import StartForm from "./_components/StartForm";
import { getClient } from "@/lib/auth/server/apollo";
import { CreateUserMutationDocument } from "./graphql";
import { CurrentViewerDocumentKey } from "@/lib/auth/server/get-current-viewer.graphql";
import { revalidateTag } from "next/cache";

export default async function StartPage() {
  async function createUser(username: string) {
    "use server";
    const { data } = await getClient().mutate({
      mutation: CreateUserMutationDocument,
      variables: { input: { username } },
    });
    if (data?.createUser.__typename === "User") {
      revalidateTag(CurrentViewerDocumentKey);
    }
  }
  return (
    <main>
      <Container size="2" py="5">
        <Card asChild>
          <StartForm onSubmit={createUser} />
        </Card>
      </Container>
    </main>
  );
}
