import { createModule } from 'graphql-modules';
import { resolvers } from './resolvers.generated';
import { typeDefs } from './module.graphql';
import { AuditLogManager } from './providers/audit-logs';

export const auditLogsModule = createModule({
  id: 'audit-logs',
  dirname: __dirname,
  typeDefs,
  resolvers,
  providers: [AuditLogManager]
});
