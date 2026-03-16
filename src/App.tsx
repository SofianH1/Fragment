import './App.css'
import { useEffect, useState } from 'react'
import FragmentForm from './Components/FragmentForm/FragmentForm'
import FragmentReader from './Components/FragmentReader/FragmentReader';
import type { FragmentFormData } from './Components/FragmentForm/FragmentForm.types';
import type { Fragment } from '@/types/fragment';


function App() {
    const [creatingFragment, setCreatingFragment] = useState(false);
    const [readingFragment, setReadingFragment] = useState(false);
    const [selectedFragment, setSelectedFragment] = useState<Fragment | null>(null);
    const [fragments, setFragments] = useState<Fragment[]>(() => {
        const storedFragments = localStorage.getItem("fragments");
        return storedFragments ? JSON.parse(storedFragments) : [];
    })

    const createFragment = (data: FragmentFormData) => {
        setFragments((prev: Fragment[]) => [
            {
                id: crypto.randomUUID(),
                title: data.title,
                content: data.content,
                tags: [],
                isPinned: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                color: data.color,
            },
            ...prev
        ]);
        setCreatingFragment(false);
    }

    const editFragment = (data: FragmentFormData) => {

        const { id, tags, createdAt, isPinned } = selectedFragment!;
        const editedFragment: Fragment = {
            id,
            title: data.title,
            content: data.content,
            tags,
            createdAt,
            updatedAt: new Date().toISOString(),
            isPinned,
            color: data.color,
        }

        const newFragments = fragments.map((fragment) => {
            if (selectedFragment!.id === fragment.id) return editedFragment;
            return fragment;
        })

        setFragments(newFragments);
        setCreatingFragment(false);
        setSelectedFragment(editedFragment);
        setReadingFragment(true);

    }

    const handleReaderClose = () => {
        setReadingFragment(false);
        setSelectedFragment(null);
    }

    const handleFormSubmit = (data: FragmentFormData) => {
        if (selectedFragment === null) {
            createFragment(data);
        }
        else {
            editFragment(data);
        }
    }

    const handleFormClose = () => {
        setCreatingFragment(false);
        setSelectedFragment(null);
    }

    const handleFragmentDelete = (id: string) => {
        if (!confirm("Delete this fragment ?")) return;
        setFragments((prev) => prev.filter((fragment) => fragment.id !== id));
        handleReaderClose();
    }

    const handleFragmentEdit = (fragment: Fragment) => {
        setReadingFragment(false);
        setSelectedFragment(fragment);
        setCreatingFragment(true);
    }

    const handleTogglePin = (id: string) => {
        const { tags, title, content, createdAt, updatedAt, isPinned, color } = selectedFragment!;
        const editedFragment: Fragment = {
            id,
            title,
            content,
            tags,
            createdAt,
            updatedAt,
            isPinned: !isPinned,
            color,
        }

        const newFragments = fragments.map((fragment) => {
            if (selectedFragment!.id === fragment.id) return editedFragment;
            return fragment;
        })

        setFragments(newFragments);
        setSelectedFragment(editedFragment);
    }



    useEffect(() => {
        localStorage.setItem("fragments", JSON.stringify(fragments))
    }, [fragments])

    useEffect(() => {
        const saved = localStorage.getItem("fragments");
        if (saved) setFragments(JSON.parse(saved));

    }, [])

    return (
        <>
            {creatingFragment && <FragmentForm onSubmit={handleFormSubmit} onClose={handleFormClose} initialFragment={selectedFragment} />}
            <div className={`app ${readingFragment ? "reading" : ""}`}>

                <div className="sideBar">
                    <button>
                        h
                    </button>

                </div>
                <main>

                    <button className='newFragmentButton' onClick={() => setCreatingFragment(true)} />
                    <div id='fragmentContainer' className={readingFragment ? "shrink" : ""}>
                        {fragments.map((fragment: Fragment, index: number) => (
                            <div key={fragment.id} className='fragment' style={{ zIndex: fragments.length - index, backgroundColor: fragment.color.background, color: fragment.color.text, marginTop: index == 0 || index == 1 ? "0" : "" }} onClick={() => {
                                setSelectedFragment(fragment);
                                setReadingFragment(true);
                            }}>

                                <h3>{fragment.title}</h3>
                                <div className='tagContainer'>
                                    {fragment.tags.map((tag: string) => (
                                        <p className='tag' key={tag}>{tag}</p>
                                    ))}
                                </div>
                                <p className='fragmentText'>{fragment.content}</p>
                            </div>))}
                    </div>
                </main>
                {readingFragment && selectedFragment != null && <FragmentReader fragment={selectedFragment!} onDelete={handleFragmentDelete} onClose={handleReaderClose} onEdit={handleFragmentEdit} togglePin={handleTogglePin} />}
            </div>
        </>
    )
}

export default App