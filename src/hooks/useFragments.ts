import { getDB } from "@/db";
import { useEffect, useState } from "react";
import type { FragmentFormData } from "@/Components/FragmentForm/FragmentForm.types";
import type { Fragment } from "@/types/fragment";
import { v4 as uuidv4 } from "uuid";


export function useFragments() {
    const [fragments, setFragments] = useState<Fragment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDB()
            .then((db) => db.getAll("fragments"))
            .then((data) => {
                setFragments(data);
                setLoading(false);
            });
    }, []);

    const createFragment = async (data: FragmentFormData) => {
        const fragment: Fragment = {
            id: uuidv4(),
            title: data.title,
            content: data.content,
            tags: [],
            isPinned: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            color: data.color,
        };
        const db = await getDB();

        await db.put("fragments", fragment);
        setFragments((prev) => [fragment, ...prev]);
    };

    const updateFragment = async (updated: Fragment) => {
        const fragment = { ...updated, updatedAt: new Date().toISOString() };
        const db = await getDB();

        await db.put("fragments", fragment);
        setFragments((prev) => prev.map((f) => (f.id === fragment.id ? fragment : f)));

        return fragment;
    };

    const deleteFragment = async (id: string) => {
        const db = await getDB();

        await db.delete("fragments", id);
        setFragments((prev) => prev.filter((f) => f.id !== id));
    };
    return { fragments, loading, createFragment, updateFragment, deleteFragment };
}