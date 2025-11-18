'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, query, QueryConstraint, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  getDocument,
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  setDocument,
  queryDocuments,
} from '@/lib/firestore';

// ==================== DOCUMENT HOOK ====================

/**
 * Hook to fetch and subscribe to a single document
 */
export function useDocument<T = DocumentData>(collectionName: string, docId: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!docId) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Fetch initial data
    getDocument<T>(collectionName, docId)
      .then((doc) => {
        setData(doc);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });

    // Subscribe to real-time updates
    const docRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        const doc = snapshot.docs.find((d) => d.id === docId);
        if (doc) {
          setData({ id: doc.id, ...doc.data() } as T);
        } else {
          setData(null);
        }
      },
      (err) => {
        console.error('Error in document snapshot:', err);
        setError(err);
      }
    );

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { data, loading, error };
}

// ==================== COLLECTION HOOK ====================

/**
 * Hook to fetch and subscribe to a collection
 */
export function useCollection<T = DocumentData>(
  collectionName: string,
  constraints?: QueryConstraint[]
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    // Subscribe to real-time updates
    const collectionRef = collection(db, collectionName);
    const q = constraints ? query(collectionRef, ...constraints) : collectionRef;

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(docs);
        setLoading(false);
      },
      (err) => {
        console.error('Error in collection snapshot:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  return { data, loading, error };
}

// ==================== CRUD OPERATIONS HOOK ====================

/**
 * Hook for CRUD operations on Firestore
 */
export function useFirestore<T = DocumentData>(collectionName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Create a new document
   */
  const create = useCallback(
    async (data: Partial<T>, docId?: string): Promise<string> => {
      setLoading(true);
      setError(null);

      try {
        const id = await createDocument<T>(collectionName, data, docId);
        setLoading(false);
        return id;
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        throw err;
      }
    },
    [collectionName]
  );

  /**
   * Update an existing document
   */
  const update = useCallback(
    async (docId: string, data: Partial<T>): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        await updateDocument<T>(collectionName, docId, data);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        throw err;
      }
    },
    [collectionName]
  );

  /**
   * Delete a document
   */
  const remove = useCallback(
    async (docId: string): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        await deleteDocument(collectionName, docId);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        throw err;
      }
    },
    [collectionName]
  );

  /**
   * Set a document (create or overwrite)
   */
  const set = useCallback(
    async (docId: string, data: Partial<T>, merge: boolean = false): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        await setDocument<T>(collectionName, docId, data, merge);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        throw err;
      }
    },
    [collectionName]
  );

  /**
   * Get a single document
   */
  const get = useCallback(
    async (docId: string): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const doc = await getDocument<T>(collectionName, docId);
        setLoading(false);
        return doc;
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        throw err;
      }
    },
    [collectionName]
  );

  /**
   * Get multiple documents
   */
  const getAll = useCallback(
    async (constraints?: QueryConstraint[]): Promise<T[]> => {
      setLoading(true);
      setError(null);

      try {
        const docs = await getDocuments<T>(collectionName, constraints);
        setLoading(false);
        return docs;
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        throw err;
      }
    },
    [collectionName]
  );

  /**
   * Query documents
   */
  const queryDocs = useCallback(
    async (
      filters: { field: string; operator: any; value: any }[],
      orderByField?: string,
      orderDirection: 'asc' | 'desc' = 'asc',
      limitCount?: number
    ): Promise<T[]> => {
      setLoading(true);
      setError(null);

      try {
        const docs = await queryDocuments<T>(
          collectionName,
          filters,
          orderByField,
          orderDirection,
          limitCount
        );
        setLoading(false);
        return docs;
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        throw err;
      }
    },
    [collectionName]
  );

  return {
    create,
    update,
    remove,
    set,
    get,
    getAll,
    query: queryDocs,
    loading,
    error,
  };
}

// ==================== BATCH OPERATIONS HOOK ====================

/**
 * Hook for batch operations
 */
export function useBatchFirestore() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Create multiple documents
   */
  const createBatch = useCallback(
    async <T = DocumentData>(
      collectionName: string,
      documents: Partial<T>[]
    ): Promise<string[]> => {
      setLoading(true);
      setError(null);

      try {
        const promises = documents.map((doc) => createDocument<T>(collectionName, doc));
        const ids = await Promise.all(promises);
        setLoading(false);
        return ids;
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        throw err;
      }
    },
    []
  );

  /**
   * Update multiple documents
   */
  const updateBatch = useCallback(
    async <T = DocumentData>(
      collectionName: string,
      updates: { docId: string; data: Partial<T> }[]
    ): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const promises = updates.map((update) =>
          updateDocument<T>(collectionName, update.docId, update.data)
        );
        await Promise.all(promises);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        throw err;
      }
    },
    []
  );

  /**
   * Delete multiple documents
   */
  const deleteBatch = useCallback(
    async (collectionName: string, docIds: string[]): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const promises = docIds.map((id) => deleteDocument(collectionName, id));
        await Promise.all(promises);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        throw err;
      }
    },
    []
  );

  return {
    createBatch,
    updateBatch,
    deleteBatch,
    loading,
    error,
  };
}
