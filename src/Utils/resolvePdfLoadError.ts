import { isAxiosError } from "axios";

/**
 * When responseType is "blob", error bodies from the API are still Blobs — parse for a clear UI message.
 */
export async function resolvePdfLoadErrorMessage(
  err: unknown,
): Promise<string> {
  if (!isAxiosError(err)) {
    return "Could not load the document. Please try again.";
  }

  if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
    return "Could not reach the API. Check that this app’s VITE_BASE_URL matches your live backend and that the server is running.";
  }

  if (!err.response) {
    return "Could not load the document. Please try again.";
  }

  const { status, data } = err.response;

  if (data instanceof Blob) {
    const text = await data.text();
    try {
      const json = JSON.parse(text) as {
        message?: string;
        error?: string;
      };
      const serverMsg = json.message || json.error;
      if (status === 404) {
        return (
          serverMsg ||
          "The PDF is not on the server. After a deploy, files in a non-persistent uploads folder are often lost—re-upload the document, or mount a persistent volume for the server’s uploads directory."
        );
      }
      if (status === 401) {
        return serverMsg || "Session expired. Please sign in again.";
      }
      return serverMsg || `Could not load the PDF (error ${String(status)}).`;
    } catch {
      return `Could not load the PDF (error ${String(status)}).`;
    }
  }

  if (status === 401) {
    return "Session expired. Please sign in again.";
  }

  return `Could not load the PDF (error ${String(status)}).`;
}
