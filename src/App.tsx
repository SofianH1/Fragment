import './App.css'
import { useState } from 'react'
import FragmentForm from './Components/FragmentForm/FragmentForm'
import FragmentReader from './Components/FragmentReader/FragmentReader';
import type { FragmentFormData } from './Components/FragmentForm/FragmentForm.types';
import type { Fragment } from '@/types/fragment';
import { useFragments } from './hooks/useFragments';
import { motion, AnimatePresence } from 'framer-motion';


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
                            <AnimatePresence >
                                {fragments.map((fragment: Fragment, index: number) => (
                                    <motion.div
                                        key={fragment.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        whileHover={{ y: -3 }}
                                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                                        className='fragment'
                                        style={{
                                            zIndex: fragments.length - index,
                                            backgroundColor: fragment.color.background,
                                            color: fragment.color.text,
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
                                    </motion.div>))}
                            </AnimatePresence>
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