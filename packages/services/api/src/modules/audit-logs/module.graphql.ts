import { gql } from 'graphql-modules';

export const typeDefs = gql`
  scalar Date
  scalar JSON

  enum AuditLogEventAction {
    USER_INVITED
    USER_JOINED
    USER_REMOVED
    EXPIRED_INVITE_HIT
    ORGANIZATION_SETTINGS_UPDATED
    ORGANIZATION_TRANSFERRED
    PROJECT_CREATED
    PROJECT_SETTINGS_UPDATED
    PROJECT_DELETED
    TARGET_CREATED
    TARGET_SETTINGS_UPDATED
    TARGET_DELETED
    SCHEMA_POLICY_SETTINGS_UPDATED
    SCHEMA_CHECKED
    SCHEMA_PUBLISH
    SCHEMA_DELETED
    ROLE_CREATED
    ROLE_ASSIGNED
    ROLE_DELETED
  }

  type AuditLog {
    id: ID!
    eventTime: Date!
    userId: String
    userEmail: String
    organizationId: String!
    projectId: String
    projectName: String
    targetId: String
    targetName: String
    schemaVersionId: String
    eventAction: AuditLogEventAction!
    eventDetails: JSON
  }

  type AuditLogEdge {
    node: AuditLog!
    cursor: String!
  }

  type AuditLogConnection {
    edges: [AuditLogEdge!]!
    pageInfo: PageInfo!
  }

  type AuditLogFileExport {
    id: ID!
    url: String!
    validUntil: Date!
    createdAt: Date!
  }

  type ExportResultEdge {
    node: AuditLogFileExport!
    cursor: String!
  }

  type ExportResultConnection {
    edges: [ExportResultEdge!]!
    pageInfo: PageInfo!
  }

  input AuditLogFilter {
    startDate: Date
    endDate: Date
    userId: String
    userEmail: String
    projectId: String
    targetId: String
    eventAction: AuditLogEventAction
  }

  extend type Query {
    auditLogs(filter: AuditLogFilter, first: Int = 100, after: String = null): AuditLogConnection!
    auditLogExports(first: Int = 100, after: String = null): ExportResultConnection!
  }

  extend type Mutation {
    exportAuditLogsToFile(filter: AuditLogFilter!): AuditLogFileExport!
  }

  type ModifyAuditLogError implements Error {
    message: String!
  }
`;
