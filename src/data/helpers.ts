import { customAlphabet } from "nanoid";

const PUBLIC_ID_SIZE = 12;
const PUBLIC_ID_ALPHABET = "1234567890abcdef";

export function generatePublicId(prefix: string) {
  const nanoid = customAlphabet(PUBLIC_ID_ALPHABET, PUBLIC_ID_SIZE);

  return `${prefix}_${nanoid()}`;
}
