import { ServiceBroker } from "moleculer";
import ApiGateway from "moleculer-web";

const broker = new ServiceBroker({
  nodeID: "gateway-node",
  transporter: "NATS" // Mesmo transmissor para comunicação
});

broker.createService({
  name: "gateway",
  mixins: [ApiGateway],
  settings: {
    routes: [
      {
        path: "/api",
        aliases: {
          "GET /user": "user.getUser",
          "POST /login": "auth.login",
          "GET /auth-action": "user.authenticatedAction"
        }
      }
    ]
  }
});

broker.start();
