"use client";
import Link from "next/link";
import { Flex, Button, Container, DropdownMenu } from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { ViewerProfile } from "@/lib/auth/user-type";

type Props = {
  viewer: ViewerProfile;
  onSignOut: () => Promise<void>;
};

export default function Header({ viewer, onSignOut }: Props) {
  return (
    <Flex justify="center" align="center" width="100%">
      <Container size="2">
        <Flex justify="between" align="center">
          <Link href="/" className="logo">
            Nest TODO App
          </Link>
          <div className="profile">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="soft">
                  {viewer.name}
                  <CaretDownIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  onClick={(e) => {
                    onSignOut();
                  }}
                >
                  Sign Out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </Flex>
      </Container>
    </Flex>
  );
}
