import { ServiceBroker } from "moleculer";

const broker = new ServiceBroker({
  nodeID: "user-service-node",
  transporter: "NATS"
});

broker.createService({
  name: "user",
  actions: {
    getUser(ctx) {
      return { id: 1, name: "John Doe" };
    },
    async authenticatedAction(ctx) {
      const response = await ctx.call("auth.login", { username: "admin", password: "admin" });
      if (response.token) {
        return "Authorized Action Performed";
      }
      return "Authorization Failed";
    }
  }
});

broker.start().then(() => {
  broker.repl();
})
