import { getDB } from "@/db";
import type { Fragment } from "@/types/fragment";


export async function getAllFragments(): Promise<Fragment[]> {
    const db = await getDB();
    return db.getAll("fragments");
}

export async function getFragment(id: string): Promise<Fragment | undefined> {
    const db = await getDB();
    return db.get("fragments", id);
}

export async function saveFragment(fragment: Fragment): Promise<void> {
    const db = await getDB();
    await db.put("fragments", fragment);
}

export async function deleteFragment(id: string): Promise<void> {
    const db = await getDB();
    await db.delete("fragments", id);
}