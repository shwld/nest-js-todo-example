"use client";
import React, { useEffect } from "react";
import { signInWithGoogle, auth } from "@/lib/auth/client/auth";
import { Flex, Button, Container } from "@radix-ui/themes";
import { onAuthStateChanged } from "firebase/auth";

type Props = {
  onSignIn: (idToken: string) => Promise<void>;
};

export default function LoginForm({ onSignIn }: Props) {
  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      const idToken = await user?.getIdToken();
      idToken && onSignIn(idToken);
    });
  }, [onSignIn]);

  return (
    <Flex justify="center" align="center" width="100%">
      <Container size="2">
        <Flex justify="center" align="center">
          <Button
            onClick={(e) => {
              e.preventDefault();
              signInWithGoogle();
            }}
          >
            Sign In with Google
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
}
