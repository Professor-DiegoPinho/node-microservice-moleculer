import { ServiceBroker } from "moleculer";
import ApiGateway from "moleculer-web";

const broker = new ServiceBroker({
  nodeID: "gateway-node",
  transporter: "NATS"
});

broker.createService({
  name: "gateway",
  mixins: [ApiGateway],
  settings: {
    routes: [
      {
        path: "/api",
        aliases: {
          "POST /sign-up": "auth.signUp",
          "POST /sign-in": "auth.signIn",
          "GET /auth-action": {
            action: "user.action",
            before: async (req, res, next) => {
              const ctx = req.$ctx;

              const authorization = ctx.meta.headers["authorization"];
              const token = authorization.replace("Bearer ", "");

              const user = ctx.call("auth.validateToken", { token });
              if (user.error) { return "failed" }

              next();
            }
          }
        }
      }
    ]
  }
});

broker.start();
