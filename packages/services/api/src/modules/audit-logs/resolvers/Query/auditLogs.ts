import { GraphQLError } from 'graphql';
import { AuditLogManager } from '../../providers/audit-logs';
import type { QueryResolvers, AuditLogConnection, AuditLogEdge } from './../../../../__generated__/types.next';
import { AuditLog } from 'packages/services/api/src/__generated__/types';

export const auditLogs: NonNullable<QueryResolvers['auditLogs']> = async (
  _,
  { after, first = 100 },
  { injector },
): Promise<AuditLogConnection> => {
  const auditLogManager = injector.get(AuditLogManager);

  // Fetch total count of audit logs
  const totalCount = await auditLogManager.getAuditLogsCount();
  if (totalCount === null) {
    throw new GraphQLError('Failed to retrieve the total count of audit logs');
  }

  // Determine the starting index based on the cursor
  const startIndex = after ? parseInt(after, 10) : 0;

  // Fetch the current page of audit logs
  const auditLogs = await auditLogManager.getAuditLogs(String(first), after);
  if (!auditLogs || auditLogs.data.length === 0) {
    throw new GraphQLError('No audit logs found for the given criteria');
  }


  // Determine pageInfo details
  const hasNextPage = startIndex + auditLogs.data.length < Number(totalCount);
  const hasPreviousPage = startIndex > 0;
  const endCursor = String(startIndex + auditLogs.data.length);

  const edges: AuditLogEdge[] = (auditLogs.data as AuditLog[]).map((auditLog: AuditLog) => ({
    node: auditLog,
    cursor: auditLog.id,
  }));

  return {
    pageInfo: {
      hasNextPage,
      hasPreviousPage,
      startCursor: String(startIndex + 1),
      endCursor,
    },
    edges,
  };
};
