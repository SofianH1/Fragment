// import { mockFragments } from './Mock/mockFragments'
import FragmentForm from './Components/FragmentForm'
import { useEffect, useRef, useState } from 'react'
import type { Fragment } from './types/Fragment';
import './App.css'
import useClickOutside from './hooks/useClickOutside';
import { FragmentReader } from './Components/FragmentReader';





function App() {
    const [creatingFragment, setCreatingFragment] = useState(false);
    const [readingFragment, setReadingFragment] = useState(false);
    const [selectedFragment, setSelectedFragment] = useState<Fragment | null>();
    const [fragments, setFragments] = useState<Fragment[]>(() => {
        const storedFragments = localStorage.getItem("fragments");
        return storedFragments ? JSON.parse(storedFragments) : [];
    })
    const formRef = useRef<HTMLDivElement>(null)
    const fragmentReaderRef = useRef<HTMLDivElement>(null)

    useClickOutside(formRef, () => handleFormClose());
    useClickOutside(fragmentReaderRef, () => handleReaderClose());

    const createFragment = (data: { title: string, content: string }) => {
        setFragments((prev: Fragment[]) => [
            {
                id: crypto.randomUUID(),
                title: data.title,
                content: data.content,
                tags: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            ...prev
        ]);
        setCreatingFragment(false);
    }

    const handleReaderClose = () => {
        setReadingFragment(false);
        setSelectedFragment(null);
    }

    const handleFormClose = () => {
        setCreatingFragment(false)
    }

    const handleFragmentDelete = (id: string) => {
        if (!confirm("Delete this fragment ?")) return;
        setFragments((prev) => prev.filter((fragment) => fragment.id !== id));
        handleReaderClose();
    }


    useEffect(() => {
        localStorage.setItem("fragments", JSON.stringify(fragments))
    }, [fragments])

    useEffect(() => {
        const saved = localStorage.getItem("fragments");
        console.log(saved)
        if (saved) setFragments(JSON.parse(saved));

    }, [])
    // console.log(fragments);

    return (
        <>
            {creatingFragment && <FragmentForm ref={formRef} onCreate={createFragment} onClose={handleFormClose} />}
            {readingFragment && <FragmentReader fragment={selectedFragment!} onDelete={handleFragmentDelete} onClose={handleReaderClose} ref={fragmentReaderRef} />}
            <div id='fragmentContainer'>
                <button onClick={() => setCreatingFragment(true)}>New Fragment</button>
                {fragments.map((fragment: Fragment) => (
                    <div className='fragment' onClick={() => {
                        setSelectedFragment(fragment);
                        setReadingFragment(true);
                    }}>
                        <h3>{fragment.title}</h3>
                        <div className='tagContainer'>
                            {fragment.tags.map((tag: string) => (
                                <p className='tag'>{tag}</p>
                            ))}
                        </div>
                        <p className='fragmentContent'>{fragment.content}</p>
                    </div>))}
            </div>
        </>
    )
}

export default App
