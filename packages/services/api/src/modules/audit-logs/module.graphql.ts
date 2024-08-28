import { gql } from 'graphql-modules';

export const typeDefs = gql`
  scalar Date
  scalar JSON

  interface AuditLog {
    id: ID!
    eventTime: Date!
    userId: String
    userEmail: String
    organizationId: String!
  }

  type UserInvitedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String
    userEmail: String
    organizationId: String!
    inviteeId: String!
    inviteeEmail: String!
  }

  type UserJoinedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
  }

  type UserRemovedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    removedUserId: String!
    removedUserEmail: String!
  }

  type OrganizationSettingsUpdatedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String
    userEmail: String
    organizationId: String!
    updatedFields: JSON!
  }

  type OrganizationTransferredAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    newOwnerId: String!
    newOwnerEmail: String!
  }

  type ProjectCreatedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    projectId: String!
    projectName: String!
  }

  type ProjectSettingsUpdatedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    projectId: String!
    updatedFields: JSON!
  }

  type ProjectDeletedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    projectId: String!
    projectName: String!
  }

  type TargetCreatedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    projectId: String!
    targetId: String!
    targetName: String!
  }

  type TargetSettingsUpdatedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    projectId: String!
    targetId: String!
    updatedFields: JSON!
  }

  type TargetDeletedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    projectId: String!
    targetId: String!
    targetName: String!
  }

  type SchemaPolicySettingsUpdatedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    projectId: String!
    updatedFields: JSON!
  }

  type SchemaCheckedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    projectId: String!
    schemaId: String!
    schemaName: String!
  }

  type SchemaPublishAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    projectId: String!
    schemaId: String!
    schemaName: String!
  }

  type SchemaDeletedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    projectId: String!
    schemaId: String!
    schemaName: String!
  }

  type RoleCreatedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    projectId: String!
    roleId: String!
    roleName: String!
  }

  type RoleAssignedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    projectId: String!
    roleId: String!
    roleName: String!
    userIdAssigned: String!
    userEmailAssigned: String!
  }

  type RoleDeletedAuditLog implements AuditLog {
    id: ID!
    eventTime: Date!
    userId: String!
    userEmail: String!
    organizationId: String!
    projectId: String!
    roleId: String!
    roleName: String!
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
    eventType: String # Filter by __typename if needed
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
