import fs from "fs/promises";
import * as crypto from "crypto";

export default class Tools {
  static uuidV4(): string {
    return (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        Number(c) ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
      ).toString(16)
    );
  }

  static async base64_encode(filePath: string): Promise<string> {
    return fs.readFile(filePath, { encoding: 'base64' });
  }
}

