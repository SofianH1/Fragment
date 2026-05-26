import type { FragmentReaderProps } from "./FragmentReader.types";
import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { TiPinOutline } from "react-icons/ti";
import { TiPin } from "react-icons/ti";
import { TiTrash } from "react-icons/ti";
import { TiEdit } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";


const FragmentReader = ({ fragment, onClose, onDelete, onEdit,togglePin}: FragmentReaderProps) => {
    const { title, content, tags, isPinned,color,id } = fragment;

    const fragmentReaderRef = useRef<HTMLDivElement>(null)
    useClickOutside(fragmentReaderRef, () => onClose());



    return (
        <div id="fragmentReader" ref={fragmentReaderRef} aria-hidden="true" style={{backgroundColor:color.background,color:color.text}}>
            <div id="topFragmentButtons">
            {isPinned ? <TiPin className="icon" onClick={()=>{togglePin(fragment.id)}}/> : <TiPinOutline className="icon" onClick={()=>{togglePin(fragment.id)}}/>}
            <TiTimes onClick={onClose} className="icon"/>
            </div>
            <h2>{title}</h2>
            <p>{tags}</p>
            {/* <p>{createdAt}</p>
            <p>{updatedAt}</p> */}
            <p>{content}</p>
            <TiEdit onClick={(e) => { e.stopPropagation(); onEdit(fragment) }} className="icon"/>
            <TiTrash onClick={(e) => { e.stopPropagation(); onDelete(fragment.id) }} className="icon"/>
        </div>
    )
}

export default FragmentReader;