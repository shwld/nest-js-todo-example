import { graphql } from "@/generated/graphql";

export const CurrentViewerDocumentKey = "Shared_GetCurrentViewer";
export const CurrentViewerDocument = graphql(/* GraphQL */ `
  query Shared_GetCurrentViewer {
    viewer {
      id
      name
    }
  }
`);
