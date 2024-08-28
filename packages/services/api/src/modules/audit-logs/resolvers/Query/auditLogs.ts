import { GraphQLError } from 'graphql';
import { GraphQL } from '@sentry/node/types/tracing/integrations';
import { AuditLogManager } from '../../providers/audit-logs';
import type { QueryResolvers } from './../../../../__generated__/types.next';

export const auditLogs: NonNullable<QueryResolvers['auditLogs']> = async (
  _,
  args,
  { injector },
) => {
  /* Implement Query.auditLogs resolver logic here */
  const auditLogManager = injector.get(AuditLogManager);
  const { after, first } = args;
  const auditLogs = await auditLogManager.getAuditLogs(String(first), after);
  if (!auditLogs) {
    throw new GraphQLError('Audit logs not found');
  }
  return auditLogs;
};
