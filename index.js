const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path'); 

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello(message: String!): String
    helloJose(message: String!): String
    helloJuan(message: String!): String
    helloFromJulianPuyo(message: String!): String
    helloLaura(message: String!): String
    helloCristianDavidPacheco(message: String!): String
    helloSofia(message: String!): String

  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte del profe `;
    },
    helloLaura: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte de Laura `;
      },
    helloJose: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte de Jose Castellanos `;
      },

    helloFromJulianPuyo: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte de Julian Puyo`;
      },
    helloSofia: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte de Sofía `;
      },
    helloJuan: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte de Juan Narváez`;
    },
    helloCristianDavidPacheco: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte del Master Cristian David Pacheco`;
   },
  },
};

async function startApolloServer() {
  // Crea la instancia de Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Inicia el servidor Apollo
  await server.start();

  // Crea la aplicación Express
  const app = express();

  // Aplica el middleware de Apollo Server a la aplicación 
  server.applyMiddleware({ app, path: '/graphql' });

  // Sirve la aplicación de React desde la carpeta "saludofront-app"
  const reactAppPath = path.join(__dirname, 'saludofront-app', 'dist');
  app.use(express.static(reactAppPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(reactAppPath, 'index.html'));
  });

  // Inicia el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();

