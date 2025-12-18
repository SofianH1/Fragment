import { useState } from "react"


const FragmentForm = ({ ref, onCreate, onClose }: { ref: any, onCreate: (data: { title: string, content: string }) => void, onClose: () => void}) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        if (!title.trim() && !content.trim()) return
        if (!title.trim()) {
            onCreate({ title:"New fragment", content })
        }
        else{
            onCreate({ title, content })
        }
    }

    return (
        <>
            <div id='fragmentForm' ref={ref}>
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