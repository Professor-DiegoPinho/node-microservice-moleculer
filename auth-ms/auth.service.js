import { ServiceBroker } from "moleculer";

const broker = new ServiceBroker({
  nodeID: "auth-service-node",
  transporter: "NATS"
});

broker.createService({
  name: "auth",
  actions: {
    login(ctx) {
      const { username, password } = ctx.params;
      // Lógica de autenticação fictícia
      if (username === "admin" && password === "admin") {
        return { token: "123456" };
      }
      return { error: "Invalid credentials" };
    }
  }
});

broker.start().then(() => {
  broker.repl();
})