/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask?: Maybe<Task>;
  createUser: User;
  updateTaskStatus?: Maybe<Task>;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateTaskStatusArgs = {
  input: UpdateTaskStatusInput;
};

export type Query = {
  __typename?: 'Query';
  viewer?: Maybe<Viewer>;
};

export type Task = {
  __typename?: 'Task';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  status: TaskStatus;
  title: Scalars['String']['output'];
};

export enum TaskStatus {
  Doing = 'DOING',
  Done = 'DONE',
  Todo = 'TODO'
}

export type UpdateTaskStatusInput = {
  id: Scalars['ID']['input'];
  status: TaskStatus;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Viewer = {
  __typename?: 'Viewer';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  taskStatuses: Array<Scalars['String']['output']>;
  tasks: Array<Task>;
};

export type Start_CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type Start_CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } };

export type UserTasks_TaskCardFragment = { __typename?: 'Task', id: string, title: string, description?: string | null, status: TaskStatus } & { ' $fragmentName'?: 'UserTasks_TaskCardFragment' };

export type UserTasks_GetMyTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type UserTasks_GetMyTasksQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', taskStatuses: Array<string>, tasks: Array<(
      { __typename?: 'Task' }
      & { ' $fragmentRefs'?: { 'UserTasks_TaskCardFragment': UserTasks_TaskCardFragment } }
    )> } | null };

export type UserTasks_CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type UserTasks_CreateTaskMutation = { __typename?: 'Mutation', createTask?: { __typename?: 'Task', id: string, title: string, description?: string | null, status: TaskStatus } | null };

export type UserTasks_UpdateTaskStatusMutationVariables = Exact<{
  input: UpdateTaskStatusInput;
}>;


export type UserTasks_UpdateTaskStatusMutation = { __typename?: 'Mutation', updateTaskStatus?: { __typename?: 'Task', id: string, status: TaskStatus } | null };

export type Shared_GetCurrentViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type Shared_GetCurrentViewerQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, name: string } | null };

export const UserTasks_TaskCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserTasks_TaskCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<UserTasks_TaskCardFragment, unknown>;
export const Start_CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Start_createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Start_CreateUserMutation, Start_CreateUserMutationVariables>;
export const UserTasks_GetMyTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserTasks_GetMyTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserTasks_TaskCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"taskStatuses"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserTasks_TaskCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<UserTasks_GetMyTasksQuery, UserTasks_GetMyTasksQueryVariables>;
export const UserTasks_CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserTasks_CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UserTasks_CreateTaskMutation, UserTasks_CreateTaskMutationVariables>;
export const UserTasks_UpdateTaskStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserTasks_UpdateTaskStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTaskStatusInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UserTasks_UpdateTaskStatusMutation, UserTasks_UpdateTaskStatusMutationVariables>;
export const Shared_GetCurrentViewerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Shared_GetCurrentViewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<Shared_GetCurrentViewerQuery, Shared_GetCurrentViewerQueryVariables>;