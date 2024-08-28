import { Injectable, Scope } from 'graphql-modules';
import { AuditLogEventAction, AuditLogFilter } from '../../../__generated__/types';
import { ClickHouse, sql } from '../../operations/providers/clickhouse-client';

/**
 * Responsible for audit logs.
 */

@Injectable({
  // TODO: Make sure this scope is correct for audit logs case!
  scope: Scope.Operation,
  global: true,
})
export class AuditLogManager {
  constructor(private clickHouse: ClickHouse) {}

  async createLogAuditEvent(event: AuditLogEvent) {
    const { user, organizationId, projectId, targetId, schemaVersionId, eventAction, details } =
      event;

    const query = sql`
          INSERT INTO audit_log (user_id, user_email, organization_id, project_id, project_name, target_id, target_name, schema_version_id, event_action, event_details, event_human_readable)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    const values = [
      user?.id,
      user?.email,
      organizationId,
      projectId,
      targetId,
      schemaVersionId,
      eventAction,
      details,
      JSON.stringify(details),
    ];

    // TODO: Based on the clickhouse-client.ts, the insert method is the right function to insert data!
    const result = await this.clickHouse.insert({
      data: [values],
      query,
      queryId: 'audit-log-create',
      timeout: 5000,
    });
    return result;
  }
  async getAuditLogs(after: string, first: string) {
    const query = sql`
            SELECT *
            FROM audit_log
            ORDER BY event_time DESC
            LIMIT ${first}
            OFFSET ${after ? sql`${after}` : sql`0`}
        `;

    const result = await this.clickHouse.query({
      query,
      queryId: 'get-audit-logs',
      timeout: 5000,
    });

    if (!result) {
      throw new Error('Audit logs not found');
    }

    return result;
  }
}

interface AuditLogEvent {
  user?: {
    id: string;
    email: string;
  };
  organizationId?: string | null;
  projectId?: string | null;
  targetId?: string | null;
  schemaVersionId?: string | null;
  eventAction: AuditLogEventAction;
  details: Record<string, any>;
}
