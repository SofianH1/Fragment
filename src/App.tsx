import './App.css'
import { useState } from 'react'
import FragmentForm from './Components/FragmentForm/FragmentForm'
import FragmentReader from './Components/FragmentReader/FragmentReader';
import type { FragmentFormData } from './Components/FragmentForm/FragmentForm.types';
import type { Fragment } from '@/types/fragment';
import { useFragments } from './hooks/useFragments';
import { motion, AnimatePresence } from 'framer-motion';
import { TiPlus } from "react-icons/ti";
import { TiZoom } from "react-icons/ti";
import { TiPin } from "react-icons/ti";
import { TiCog } from "react-icons/ti";


function App() {

    const { fragments, loading, createFragment, updateFragment, deleteFragment } = useFragments();

    const [creatingFragment, setCreatingFragment] = useState(false);
    const [readingFragment, setReadingFragment] = useState(false);
    const [showReader, setShowReader] = useState(false);

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

    const handleReaderOpen = (fragment: Fragment) => {
        setSelectedFragment(fragment);
        setReadingFragment(true);
        setShowReader(true);
    }

    const handleReaderClose = () => {
        setShowReader(false);
    }

    const handleFragmentDelete = async (id: string) => {
        if (!confirm("Delete this fragment ?")) return;
        await deleteFragment(id);
        handleReaderClose();
    }

    const handleFragmentEdit = (fragment: Fragment) => {
        setShowReader(false);
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
                        <button>LOGO</button>
                        <button id='newFragmentButton' onClick={() => setCreatingFragment(true)}><TiPlus /></button>
                        <button id='SearchButton'><TiZoom /></button>
                        <button id='pinnedButton'><TiPin /></button>

                        <button id='settingsButton'><TiCog /></button>
                    </div>

                    <main>

                        <div id='fragmentContainer' className={readingFragment ? "shrink" : ""}>
                            <AnimatePresence>
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
                                            handleReaderOpen(fragment);
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
                    <AnimatePresence onExitComplete={() => {
                        setReadingFragment(false);
                        setSelectedFragment(null);
                    }}>
                        {showReader && selectedFragment != null && (
                            <motion.div
                                key="reader"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                style={{
                                    gridColumn: 3,
                                    gridRow: '1 / -1',
                                    width: '380px',
                                    overflow: 'hidden',
                                    minHeight: 0,
                                }}>
                                <FragmentReader
                                    fragment={selectedFragment!}
                                    onDelete={handleFragmentDelete}
                                    onClose={handleReaderClose}
                                    onEdit={handleFragmentEdit}
                                    togglePin={handleTogglePin} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </>
    )
}

export default App