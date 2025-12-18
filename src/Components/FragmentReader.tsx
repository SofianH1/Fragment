import type { Fragment } from "../types/Fragment"

export const FragmentReader = ({fragment,onClose, onDelete,ref}:{fragment: Fragment, onClose:()=>void, ref:any, onDelete:(id:string)=>void}) => {
    const { title, content, tags, createdAt, updatedAt, isPinned } = fragment


    return (
        <div id="fragmentReader" ref={ref}>
            <h2>{title}</h2>
            <p>{tags}</p>
            <p>{createdAt}</p>
            <p>{updatedAt}</p>
            <p>{content}</p>
            <button onClick={onClose}>Close</button>
            <button onClick={() => onDelete(fragment.id)}>Delete</button>
        </div>
    )
}
