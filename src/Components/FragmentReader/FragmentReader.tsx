import type { FragmentReaderProps } from "./FragmentReader.types";
import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";


const FragmentReader = ({ fragment, onClose, onDelete, onEdit }: FragmentReaderProps) => {
    const { title, content, tags, createdAt, updatedAt, isPinned } = fragment;
    console.log(fragment);

    const fragmentReaderRef = useRef<HTMLDivElement>(null)
    useClickOutside(fragmentReaderRef, () => onClose());


    return (
        <div id="fragmentReader" ref={fragmentReaderRef}>
            <h2>{title}</h2>
            <p>{tags}</p>
            <p>{createdAt}</p>
            <p>{updatedAt}</p>
            <p>{content}</p>
            <p>{isPinned ? "" : "Not"} Pinned</p>
            <button onClick={onClose}>Close</button>
            <button onClick={(e) => { e.stopPropagation(); onEdit(fragment) }}>Edit</button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(fragment.id) }}>Delete</button>
        </div>
    )
}

export default FragmentReader;