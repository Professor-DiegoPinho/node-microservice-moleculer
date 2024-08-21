import { ServiceBroker } from "moleculer";

const broker = new ServiceBroker({
  nodeID: "user-service-node",
  transporter: "NATS"
});

broker.createService({
  name: "user",
  actions: {
    action(ctx) {
      const user = ctx.params;
      return `deu bom!, ${user.username}`;
    }
  }
});

broker.start().then(() => {
  broker.repl();
})
