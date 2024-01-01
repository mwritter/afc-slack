import { App } from "@slack/bolt";

const app = new App({
  socketMode: true,
  signingSecret: process.env.SLACK_APP_SIGING_SECRET,
  token: process.env.SLACK_APP_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  customRoutes: [
    {
      path: "/services",
      method: ["GET"],
      handler: async (req, res) => {
        await fetch(
          "https://hooks.slack.com/services/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",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: "SERVER" }),
          }
        );
        res.writeHead(200);
        res.end("Should Have worked");
      },
    },
  ],
});

app.command("/services", async ({ command, ack, respond, say }) => {
  await ack();
  await say("Request approved 👍");
  // await respond(`${command.text} - for ${command.user_name}`);
});

app.start(process.env.PORT || 3000).then(() => {
  console.log("bolt running");
});
