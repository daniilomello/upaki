import axios from "axios";

export async function getPresignedURL(file: File) {
  const { data } = await axios.post<{signedUrl: string}>(
    'https://ts7cfiva6u7kfhzvuiehcc7zsq0qyavk.lambda-url.us-east-1.on.aws',
    { fileName: file.name }
  );

  return data.signedUrl
}