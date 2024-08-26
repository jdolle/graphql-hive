import { createModule } from 'graphql-modules';
import { typeDefs } from './module.graphql';
import { resolvers } from './resolvers.generated';

export const auditLogsModule = createModule({
  id: 'audit-logs',
  dirname: __dirname,
  typeDefs,
  resolvers
});
