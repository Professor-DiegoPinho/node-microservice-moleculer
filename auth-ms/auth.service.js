import { ServiceBroker } from "moleculer";

const users = [];

const broker = new ServiceBroker({
  nodeID: "auth-service-node",
  transporter: "NATS"
});

broker.createService({
  name: "auth",
  actions: {
    signUp(ctx) {
      const { username, password } = ctx.params;
      users.push({
        username,
        password
      });

      return "User created."
    },

    signIn(ctx) {
      const { username, password } = ctx.params;
      const user = users.find(user => user.username === username);
      if (user && user.password === password) {
        const token = "lorem-ipsum";
        user.token = token;
        return {
          token
        }
      }

      return { error: "Invalid credentials" }
    },

    validateToken(ctx) {
      console.log("to passando aqui veínho")
      console.log(user)

      const { token } = ctx.params;
      const user = users.find(user => user.token === token);
      if (!user) return { error: "Invalid token." }

      return user;
    }
  }
});

broker.start().then(() => {
  broker.repl();
})