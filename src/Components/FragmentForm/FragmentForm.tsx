import { useState, useRef } from "react"
import type { FragmentFormProps } from "./FragmentForm.types";
import useClickOutside from "@/hooks/useClickOutside";
import type { FragmentColor } from "@/types/fragment";
import { DEFAULT_FRAGMENT_COLORS } from "@/constants/fragmentColors";


const FragmentForm = ({ onSubmit, onClose, initialFragment }: FragmentFormProps) => {

    const [title, setTitle] = useState(initialFragment?.title ?? "");
    const [content, setContent] = useState(initialFragment?.content ?? "");
    const [color, setColor] = useState<FragmentColor>(initialFragment?.color ?? DEFAULT_FRAGMENT_COLORS[0]);

    const formRef = useRef<HTMLDivElement>(null)

    useClickOutside(formRef, () => onClose());

    const handleSubmit = () => {
        if (!title.trim() && !content.trim()) return
        if (!title.trim()) {
            onSubmit({ title: "New fragment", content, color })
        }
        else {
            onSubmit({ title, content, color })
        }
    }

    return (
        <>
            <div id="formOverlay"></div>
            <div id='fragmentForm' ref={formRef} style={{backgroundColor:color.background}}>
                <div className="colorPicker">
                    {DEFAULT_FRAGMENT_COLORS.map((c, index) => (
                        <button
                            key={index}
                            style={{backgroundColor:c.background}}
                            className={color.background === c.background ? "selectedColor" : ""}
                            onClick={()=>setColor(c)}
                        />

                    ))}
                </div>
                <div id="titleContainer">
                    <label htmlFor="titleInput">Title : </label>
                    <input
                        id="titleInput"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Fragment title" />
                </div>
                <div id="contentContainer">
                    <label htmlFor="contentInput">Content : </label>
                    <textarea
                        id="contentInput"
                        value={content}
                        placeholder="Fragment content"
                        onChange={e => setContent(e.target.value)}/>
                </div>
                <button onClick={handleSubmit}>Save</button>
                <button onClick={onClose}>Close</button>
            </div>
        </>
    )
}

export default FragmentForm