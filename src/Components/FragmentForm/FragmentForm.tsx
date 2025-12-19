import { useState, useRef } from "react"
import type { FragmentFormProps } from "./FragmentForm.types";
import useClickOutside from "@/hooks/useClickOutside";


const FragmentForm = ({ onSubmit, onClose, initialFragment }: FragmentFormProps) => {

    const [title, setTitle] = useState(initialFragment?.title ?? "");
    const [content, setContent] = useState(initialFragment?.content ?? "");
    const formRef = useRef<HTMLDivElement>(null)

    useClickOutside(formRef, () => onClose());

    const handleSubmit = () => {
        if (!title.trim() && !content.trim()) return
        if (!title.trim()) {
            onSubmit({ title: "New fragment", content })
        }
        else {
            onSubmit({ title, content })
        }
    }

    return (
        <>
            <div id='fragmentForm' ref={formRef}>
                <label htmlFor="titleInput">Title : </label>
                <input
                    id="titleInput"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Fragment title" />

                <label htmlFor="contentInput">Content : </label>
                <textarea
                    id="contentInput"
                    value={content}
                    placeholder="Fragment content"
                    onChange={e => setContent(e.target.value)}
                />
                <button onClick={handleSubmit}>Save</button>
                <button onClick={onClose}>Close</button>
            </div>
        </>
    )
}

export default FragmentForm