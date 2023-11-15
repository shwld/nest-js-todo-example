import { HttpLink } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "./session";
import { getCurrentFirebaseUser, getIdToken } from "./auth";

export const { getClient } = registerApolloClient(() => {
  const authLink = setContext(async (_, { headers }) => {
    const { currentUser } = await getCurrentFirebaseUser(await getSession());
    const token = currentUser ? await getIdToken(currentUser) : null;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: authLink.concat(
      new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      })
    ),
  });
});
