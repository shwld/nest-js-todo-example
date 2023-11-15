import Image from "next/image";
import {
  Flex,
  Text,
  Button,
  Container,
  Card,
  IconButton,
} from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Flex justify="center" my="5">
        <Link href="/tasks">Go to tasks</Link>
      </Flex>
    </main>
  );
}
