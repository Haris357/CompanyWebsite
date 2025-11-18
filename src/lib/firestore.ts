import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  type DocumentData,
  type QueryConstraint,
  Timestamp,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// ==================== GENERIC FIRESTORE OPERATIONS ====================

/**
 * Get a single document from a collection
 */
export async function getDocument<T = DocumentData>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Get all documents from a collection
 */
export async function getDocuments<T = DocumentData>(
  collectionName: string,
  constraints?: QueryConstraint[]
): Promise<T[]> {
  try {
    const collectionRef = collection(db, collectionName);
    const q = constraints ? query(collectionRef, ...constraints) : collectionRef;
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Create a new document in a collection
 */
export async function createDocument<T = DocumentData>(
  collectionName: string,
  data: Partial<T>,
  docId?: string
): Promise<string> {
  try {
    const timestamp = serverTimestamp();
    const docData = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    if (docId) {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, docData);
      return docId;
    } else {
      const docRef = await addDoc(collection(db, collectionName), docData);
      return docRef.id;
    }
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Update an existing document
 */
export async function updateDocument<T = DocumentData>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Delete a document from a collection
 */
export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Set a document (create or overwrite)
 */
export async function setDocument<T = DocumentData>(
  collectionName: string,
  docId: string,
  data: Partial<T>,
  merge: boolean = false
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(
      docRef,
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge }
    );
  } catch (error) {
    console.error(`Error setting document in ${collectionName}:`, error);
    throw error;
  }
}

// ==================== QUERY HELPERS ====================

/**
 * Query documents with filters
 */
export async function queryDocuments<T = DocumentData>(
  collectionName: string,
  filters: { field: string; operator: any; value: any }[],
  orderByField?: string,
  orderDirection: 'asc' | 'desc' = 'asc',
  limitCount?: number
): Promise<T[]> {
  try {
    const collectionRef = collection(db, collectionName);
    const constraints: QueryConstraint[] = [];

    // Add where clauses
    filters.forEach((filter) => {
      constraints.push(where(filter.field, filter.operator, filter.value));
    });

    // Add orderBy
    if (orderByField) {
      constraints.push(orderBy(orderByField, orderDirection));
    }

    // Add limit
    if (limitCount) {
      constraints.push(limit(limitCount));
    }

    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  } catch (error) {
    console.error(`Error querying documents from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Check if a document exists
 */
export async function documentExists(
  collectionName: string,
  docId: string
): Promise<boolean> {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error(`Error checking document existence in ${collectionName}:`, error);
    throw error;
  }
}

// ==================== BATCH OPERATIONS ====================

/**
 * Get multiple documents by IDs
 */
export async function getDocumentsByIds<T = DocumentData>(
  collectionName: string,
  ids: string[]
): Promise<T[]> {
  try {
    const promises = ids.map((id) => getDocument<T>(collectionName, id));
    const results = await Promise.all(promises);
    return results.filter((doc) => doc !== null) as T[];
  } catch (error) {
    console.error(`Error getting documents by IDs from ${collectionName}:`, error);
    throw error;
  }
}

// ==================== TIMESTAMP HELPERS ====================

/**
 * Convert Firestore Timestamp to Date
 */
export function timestampToDate(timestamp: Timestamp): Date {
  return timestamp.toDate();
}

/**
 * Convert Date to Firestore Timestamp
 */
export function dateToTimestamp(date: Date): Timestamp {
  return Timestamp.fromDate(date);
}

/**
 * Get current Firestore Timestamp
 */
export function getCurrentTimestamp(): Timestamp {
  return Timestamp.now();
}
