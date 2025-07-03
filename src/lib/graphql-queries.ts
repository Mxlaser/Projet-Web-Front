import { gql } from "@apollo/client";

// Authentification
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      user {
        id
        email
        fullName
        role
        createdAt
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $fullName: String!) {
    register(email: $email, password: $password, fullName: $fullName) {
      access_token
      user {
        id
        email
        fullName
        role
        createdAt
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      email
      fullName
      role
      createdAt
    }
  }
`;

// Documents
export const GET_MY_DOCUMENTS = gql`
  query GetMyDocuments {
    myDocuments {
      id
      title
      description
      fileUrl
      userId
      createdAt
      updatedAt
      user {
        id
        email
        fullName
      }
    }
  }
`;

export const GET_DOCUMENT = gql`
  query GetDocument($id: String!) {
    document(id: $id) {
      id
      title
      description
      fileUrl
      userId
      createdAt
      updatedAt
      user {
        id
        email
        fullName
      }
    }
  }
`;

export const GET_ALL_DOCUMENTS = gql`
  query GetAllDocuments {
    documents {
      id
      title
      description
      fileUrl
      userId
      createdAt
      updatedAt
      user {
        id
        email
        fullName
      }
    }
  }
`;

export const CREATE_DOCUMENT = gql`
  mutation CreateDocument($input: CreateDocumentInput!) {
    createDocument(createDocumentInput: $input) {
      id
      title
      description
      fileUrl
      userId
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_DOCUMENT = gql`
  mutation UpdateDocument($input: UpdateDocumentInput!) {
    updateDocument(updateDocumentInput: $input) {
      id
      title
      description
      fileUrl
      userId
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_DOCUMENT = gql`
  mutation DeleteDocument($id: String!) {
    removeDocument(id: $id) {
      id
      title
    }
  }
`;
