/**
 * @file server
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

const { GraphQLServer, PubSub } = require('graphql-yoga');
const BlockProducer = require('./BlockProducer');
const Constants = require('./constants');

// "I wrote the original implementation of the graphql-subscriptions package you're using. The
// simple EventEmitter pubsub library included in graphql-subscriptions is only intended for demo
// purposes. EventEmitters don't really scale to large numbers, they're in-memory, and they'll only
// work as long as you have no more than a single server. For anyone trying to run GraphQL
// subscriptions in production, I strongly recommend using a different system, for example Redis or
// MQTT through graphql-redis-subscriptions or graphql-mqtt-subscriptions. This will have the
// advantage of keeping the GraphQL server stateless (apart from the websockets) and thus easy to
// scale horizontally."
const pubsub = new PubSub();
pubsub.ee.setMaxListeners(100); // raise max listeners in event emitter
const blockProducer = new BlockProducer(pubsub);

const resolvers = {
  Query: {
    blocks:
      (parent, args) =>
        args.first ? blockProducer.blocks.slice(0, args.first) : blockProducer.blocks,
    block:
      (parent, args) => blockProducer.blocks.find(block => block.id === args.id),
    transactions:
      (parent, args) =>
        args.first ? blockProducer.transactions.slice(0, args.first) : blockProducer.transactions,
    transaction:
      (parent, args) =>
        blockProducer.transactions.find(transaction => transaction.id === args.id)
  },
  Subscription: {
    newBlock: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator(Constants.PUBSUB_CHANNEL_NEW_BLOCK);
      }
    },
    newTransaction: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator(Constants.PUBSUB_CHANNEL_NEW_TRANSACTION);
      }
    },
    blocks: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator(Constants.PUBSUB_CHANNEL_BLOCKS);
      }
    },
    transactions: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator(Constants.PUBSUB_CHANNEL_TRANSACTIONS);
      }
    }
  },
  // Do not expose mutations on deployed server.
  // Mutation: {
  //   createBlock: (parent, args) => {
  //     const block = {
  //       id: `block_${blockProducer.blockId++}`,
  //       height: args.height,
  //       timestamp: args.timestamp,
  //       numTransactions: args.numTransactions
  //     };
  //     blockProducer.addBlock(block);
  //     return block;
  //   },
  //   createTransaction: (parent, args) => {
  //     const transaction = {
  //       id: `transaction_${blockProducer.transactionId++}`,
  //       hash: args.hash,
  //       amount: args.amount
  //     };
  //     blockProducer.addTransaction(transaction);
  //     return transaction;
  //   }
  // }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { pubsub }
});

server.start(() => console.log('The server is running on port 4000...'));
