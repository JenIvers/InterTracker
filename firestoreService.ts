import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { AppState } from "./types";

const COLLECTION_NAME = "intern_data";

export interface SaveResult {
  success: boolean;
  error?: string;
}

export const saveStateToFirestore = async (userId: string, state: AppState): Promise<SaveResult> => {
  if (!userId) {
    return { success: false, error: "No user ID provided" };
  }
  try {
    const docRef = doc(db, COLLECTION_NAME, userId);
    await setDoc(docRef, state);
    return { success: true };
  } catch (error) {
    console.error("Error saving state to Firestore:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return { success: false, error: errorMessage };
  }
};

export const loadStateFromFirestore = async (userId: string): Promise<AppState | null> => {
  if (!userId) return null;
  try {
    const docRef = doc(db, COLLECTION_NAME, userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as AppState;
    }
    return null;
  } catch (error) {
    console.error("Error loading state from Firestore:", error);
    return null;
  }
};
