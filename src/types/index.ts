export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  userId: string;
  user: User;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface CreateDocumentInput {
  title: string;
  description: string;
  fileUrl: string;
}

export interface UpdateDocumentInput {
  id: string;
  title?: string;
  description?: string;
  fileUrl?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
