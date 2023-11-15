import { ViewerProfile } from "../user-type";
import { getClient } from "./apollo";
import {
  CurrentViewerDocument,
  CurrentViewerDocumentKey,
} from "./get-current-viewer.graphql";

export async function getCurrentViewer(): Promise<ViewerProfile | null> {
  const { data } = await getClient().query({
    query: CurrentViewerDocument,
    context: {
      next: {
        tags: [CurrentViewerDocumentKey],
      },
    },
  });
  return data.viewer ?? null;
}
