import { ServiceBroker } from "moleculer";
import ApiGatewayService from "moleculer-web";

const broker = new ServiceBroker({
  nodeID: "gateway-node",
  transporter: "NATS",
  logLevel: "debug"
});

// https://moleculer.services/docs/0.13/moleculer-web.html

broker.createService({
  name: "gateway",
  mixins: [ApiGatewayService],
  settings: {
    port: 5000,
    routes: [
      {
        path: "/auth",
        aliases: {
          "POST /sign-up": "auth.signUp",
          "POST /sign-in": "auth.signIn"
        }
      },
      {
        path: "/api",
        bodyParsers: {
          json: true,
          urlencoded: { extended: true }
        },
        authorization: true,
        aliases: {
          "GET /products": "product.getProducts"
        }
      }
    ]
  },
  methods: {
    async authorize(ctx, route, req, res) {
      let auth = req.headers["authorization"];
      if (auth && auth.startsWith("Bearer")) {
        let token = auth.slice(7);

        const user = await ctx.call("auth.validateToken", { token });
        broker.logger.debug("user", user);

        if (!user.error) return Promise.resolve(ctx);

        return Promise.reject({ error: "Token Inválido" });

      } else {
        return Promise.reject({ error: "Token Inválido" });
      }
    }

  }
});

broker.start();