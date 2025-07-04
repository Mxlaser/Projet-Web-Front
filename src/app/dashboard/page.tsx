"use client";

import { CreateDocumentModal } from "@/components/CreateDocumentModal";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { useToaster } from "@/components/ui/Toaster";
import { useAuth } from "@/contexts/AuthContext";
import { useMyDocuments } from "@/lib/graphql-service";
import { Document } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { addToast } = useToaster();
  const router = useRouter();
  const { data, loading, error, refetch } = useMyDocuments();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mémoiser les documents pour éviter les re-rendus
  const documents = useMemo(() => data?.myDocuments || [], [data?.myDocuments]);

  // Mémoiser les callbacks pour éviter les re-rendus
  const handleLogout = useCallback(() => {
    logout();
    router.push("/login");
    addToast("Déconnexion réussie", "success");
  }, [logout, router, addToast]);

  const handleCreateSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleOpenCreateModal = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  useEffect(() => {
    if (error) {
      addToast("Erreur lors du chargement des documents", "error");
    }
  }, [error, addToast]);

  return (
    <ProtectedRoute>
      {user && (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Bienvenue, {user.fullName} ({user.role})
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{user.email}</span>
                  <Button onClick={handleLogout} variant="outline">
                    Se déconnecter
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Mes Documents
                </h2>
                <Button onClick={handleOpenCreateModal}>
                  Ajouter un document
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">
                    Chargement des documents...
                  </p>
                </div>
              ) : documents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="mx-auto h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun document
                  </h3>
                  <p className="text-gray-500">
                    Commencez par ajouter votre premier document.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {documents.map((doc: Document) => (
                    <div
                      key={doc.id}
                      className="bg-white rounded-lg shadow p-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {doc.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{doc.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>
                          Créé le{" "}
                          {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            addToast("Fonctionnalité à venir", "info")
                          }
                        >
                          Voir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>

          {/* Create Document Modal */}
          <CreateDocumentModal
            isOpen={isCreateModalOpen}
            onClose={handleCloseCreateModal}
            onSuccess={handleCreateSuccess}
          />
        </div>
      )}
    </ProtectedRoute>
  );
}
