import { ServiceBroker } from "moleculer";

const broker = new ServiceBroker();

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
  // O serviço está ativo e rodando
  broker.repl();
})