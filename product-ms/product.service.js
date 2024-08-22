import { ServiceBroker } from "moleculer";

const products = [
  { id: 1, name: "PC da Xuxa", price: 15000 }
]

const broker = new ServiceBroker({
  nodeID: "product-service-node",
  transporter: "NATS"
});

broker.createService({
  name: "product",
  actions: {
    getProducts(ctx) {
      const user = ctx.params;
      return products;
    }
  }
});

broker.start().then(() => {
  broker.repl();
})
