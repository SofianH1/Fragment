import './App.css'
import { useState } from 'react'
import FragmentForm from './Components/FragmentForm/FragmentForm'
import FragmentReader from './Components/FragmentReader/FragmentReader';
import type { FragmentFormData } from './Components/FragmentForm/FragmentForm.types';
import type { Fragment } from '@/types/fragment';
import { useFragments } from './hooks/useFragments';


function App() {

    const { fragments, loading, createFragment, updateFragment, deleteFragment } = useFragments();

    const [creatingFragment, setCreatingFragment] = useState(false);
    const [readingFragment, setReadingFragment] = useState(false);
    const [selectedFragment, setSelectedFragment] = useState<Fragment | null>(null);


    const handleFormSubmit = async (data: FragmentFormData) => {
        if (selectedFragment == null) {
            await createFragment(data);
        } else {
            const updated = await updateFragment({
                ...selectedFragment,
                title: data.title,
                content: data.content,
                color: data.color,
            });
            setSelectedFragment(updated);
            setReadingFragment(true);
        }
        setCreatingFragment(false);
    }

    const handleFormClose = () => {
        setCreatingFragment(false);
        setSelectedFragment(null);
    }

    const handleReaderClose = () => {
        setReadingFragment(false);
        setSelectedFragment(null);
    }

    const handleFragmentDelete = async (id: string) => {
        if (!confirm("Delete this fragment ?")) return;
        await deleteFragment(id);
        handleReaderClose();
    }

    const handleFragmentEdit = (fragment: Fragment) => {
        setReadingFragment(false);
        setSelectedFragment(fragment);
        setCreatingFragment(true);
    }

    const handleTogglePin = async (id: string) => {
        if (!selectedFragment) return;
        const updated = await updateFragment({ ...selectedFragment, id, isPinned: !selectedFragment.isPinned });
        setSelectedFragment(updated);
    };


    return (
        loading ? <p>Loading...</p> :
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
                                <div
                                    key={fragment.id}
                                    className='fragment'
                                    style={{
                                        zIndex: fragments.length - index,
                                        backgroundColor: fragment.color.background,
                                        color: fragment.color.text,
                                        marginTop: index == 0 || index == 1 ? "0" : ""
                                    }}
                                    onClick={() => {
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
                    {readingFragment && selectedFragment != null && <FragmentReader
                        fragment={selectedFragment!}
                        onDelete={handleFragmentDelete}
                        onClose={handleReaderClose}
                        onEdit={handleFragmentEdit}
                        togglePin={handleTogglePin} />}
                </div>
            </>
    )
}

export default App