import axios from "axios";

export async function getPresignedURL(file: File) {
  const url = process.env.LAMBDA_ENDPOINT ?? '';

  const { data } = await axios.post<{signedUrl: string}>(
    url,
    { fileName: file.name }
  );

  return data.signedUrl
}