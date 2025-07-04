import {
  AuthResponse,
  CreateDocumentInput,
  Document,
  LoginCredentials,
  User,
} from "@/types";
import {
  ApolloClient,
  NormalizedCacheObject,
  useMutation,
  useQuery,
} from "@apollo/client";
import {
  CREATE_DOCUMENT,
  DELETE_DOCUMENT,
  GET_ALL_DOCUMENTS,
  GET_CURRENT_USER,
  GET_DOCUMENT,
  GET_MY_DOCUMENTS,
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  UPDATE_DOCUMENT,
} from "./graphql-queries";

// Hooks pour l'authentification
export const useLogin = () => {
  return useMutation(LOGIN_MUTATION);
};

export const useRegister = () => {
  return useMutation(REGISTER_MUTATION);
};

export const useCurrentUser = () => {
  return useQuery(GET_CURRENT_USER, {
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
};

// Hooks pour les documents
export const useMyDocuments = () => {
  return useQuery(GET_MY_DOCUMENTS, {
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
};

export const useAllDocuments = () => {
  return useQuery(GET_ALL_DOCUMENTS, {
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
};

export const useDocument = (id: string) => {
  return useQuery(GET_DOCUMENT, {
    variables: { id },
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
};

export const useCreateDocument = () => {
  return useMutation(CREATE_DOCUMENT);
};

export const useUpdateDocument = () => {
  return useMutation(UPDATE_DOCUMENT);
};

export const useDeleteDocument = () => {
  return useMutation(DELETE_DOCUMENT);
};

// Service classique pour les appels directs (sans hooks)
export class GraphQLService {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await this.client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { loginInput: credentials },
    });
    return data.login;
  }

  async register(userData: {
    email: string;
    password: string;
    fullName: string;
  }): Promise<AuthResponse> {
    const { data } = await this.client.mutate({
      mutation: REGISTER_MUTATION,
      variables: { registerInput: userData },
    });
    return data.register;
  }

  async getCurrentUser(): Promise<User> {
    const { data } = await this.client.query({
      query: GET_CURRENT_USER,
    });
    return data.me;
  }

  async getDocuments(): Promise<Document[]> {
    const { data } = await this.client.query({
      query: GET_ALL_DOCUMENTS,
    });
    return data.documents;
  }

  async getMyDocuments(): Promise<Document[]> {
    const { data } = await this.client.query({
      query: GET_MY_DOCUMENTS,
    });
    return data.myDocuments;
  }

  async getDocument(id: string): Promise<Document> {
    const { data } = await this.client.query({
      query: GET_DOCUMENT,
      variables: { id },
    });
    return data.document;
  }

  async createDocument(input: CreateDocumentInput): Promise<Document> {
    const { data } = await this.client.mutate({
      mutation: CREATE_DOCUMENT,
      variables: { createDocumentInput: input },
    });
    return data.createDocument;
  }

  async updateDocument(input: {
    id: string;
    title?: string;
    description?: string;
    fileUrl?: string;
  }): Promise<Document> {
    const { data } = await this.client.mutate({
      mutation: UPDATE_DOCUMENT,
      variables: { updateDocumentInput: input },
    });
    return data.updateDocument;
  }

  async deleteDocument(id: string): Promise<void> {
    await this.client.mutate({
      mutation: DELETE_DOCUMENT,
      variables: { id },
    });
  }
}
