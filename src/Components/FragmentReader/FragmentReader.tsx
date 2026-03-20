import type { FragmentReaderProps } from "./FragmentReader.types";
import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { TiPinOutline } from "react-icons/ti";
import { TiPin } from "react-icons/ti";
import { TiTrash } from "react-icons/ti";
import { TiEdit } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";
import {motion} from "framer-motion";


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
            <motion.h2 transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }} layoutId={`fragmentTitle-${id}`}>{title}</motion.h2>
            <p>{tags}</p>
            {/* <p>{createdAt}</p>
            <p>{updatedAt}</p> */}
            <motion.p transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }} layoutId={`fragmentText-${id}`} layout="position">{content}</motion.p>
            <TiEdit onClick={(e) => { e.stopPropagation(); onEdit(fragment) }} className="icon"/>
            <TiTrash onClick={(e) => { e.stopPropagation(); onDelete(fragment.id) }} className="icon"/>
        </div>
    )
}

export default FragmentReader;