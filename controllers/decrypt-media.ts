import { Client, decryptMedia, Message } from "@open-wa/wa-automate";
import * as mime from "mime-types";
import * as fs from "fs";
import * as path from "path";

export function decrypt(client: Client) {
  client.onAnyMessage(async (message: Message) => {
    // auth, is the comand from host account ?
    if (
      message.fromMe === true &&
      message.body.toLowerCase() === "!open" &&
      message.quotedMsg
    ) {
      // get the quoted message (message replied)
      const quotedMessage = message.quotedMsg;

      // generate file name
      if (quotedMessage.mimetype) {
        const filename = `${Date.now()}.${mime.extension(
          quotedMessage.mimetype
        )}`;

        // decrypt media
        const mediaData = await decryptMedia(quotedMessage);
        const imageBase64 = `data:${
          quotedMessage.mimetype
        };base64,${mediaData.toString("base64")}`;
        await client.sendImage(
          message.chatId,
          imageBase64,
          filename,
          `Here's your fav pap`
        );
        // create decrypted file on path images
        const filePath = path.join(__dirname, "../images", filename);
        fs.writeFile(filePath, mediaData, function (err) {
          if (err) {
            return console.log(err);
          }
          console.log("File berhasil disimpan di", filePath);
        });
      }
    }
  });
}
