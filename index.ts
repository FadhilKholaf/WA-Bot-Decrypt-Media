// import library
import { Client, create } from "@open-wa/wa-automate";

// import controllers
import { decrypt } from "./controllers/decrypt-media";

// execute client function
const start = (client: Client) => {
  decrypt(client);
};

// create a session
create({
  // executing on local google chrome machine
  useChrome: true,
})
  .then((client) => start(client))
  .catch((err) => {
    console.log(err);
  });
