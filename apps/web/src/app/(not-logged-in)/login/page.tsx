import { Container, Card } from "@radix-ui/themes";
import LoginForm from "./_components/LoginForm";
import { createNewSession } from "@/lib/auth/server/session";

export default function LoginPage() {
  async function signIn(idToken: string) {
    "use server";
    await createNewSession(idToken);
  }

  return (
    <main>
      <Container size="2" py="5">
        <Card asChild>
          <LoginForm onSignIn={signIn} />
        </Card>
      </Container>
    </main>
  );
}
