import { createModule } from 'graphql-modules';
import { resolvers } from './resolvers.generated';
import { typeDefs } from './module.graphql';

export const auditLogsModule = createModule({
  id: 'audit-logs',
  dirname: __dirname,
  typeDefs,
  resolvers,
});
