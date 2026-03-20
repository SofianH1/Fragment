import './App.css'
import { useRef, useState } from 'react'
import FragmentForm from './Components/FragmentForm/FragmentForm'
import FragmentReader from './Components/FragmentReader/FragmentReader';
import type { FragmentFormData } from './Components/FragmentForm/FragmentForm.types';
import type { Fragment } from '@/types/fragment';
import { useFragments } from './hooks/useFragments';
import { motion, AnimatePresence } from 'framer-motion';
import { TiCog } from "react-icons/ti";


function App() {

    const { fragments, loading, createFragment, updateFragment, deleteFragment } = useFragments();

    const [creatingFragment, setCreatingFragment] = useState(false);
    const [showReader, setShowReader] = useState(false);

    const [selectedFragment, setSelectedFragment] = useState<Fragment | null>(null);


    const handleFormSubmit = async (data: FragmentFormData) => {
        if (selectedFragment == null) {
            await createFragment(data);
            setCreatingFragment(false);
        } else {
            const updated = await updateFragment({
                ...selectedFragment,
                title: data.title,
                content: data.content,
                color: data.color,
            });
            setSelectedFragment(updated);
            setCreatingFragment(false);
            setShowReader(true);
        }
    }

    const handleFormClose = () => {
        setCreatingFragment(false);
        setSelectedFragment(null);
    }

    const handleReaderOpen = (fragment: Fragment) => {
        setSelectedFragment(fragment);
        setShowReader(true);
    }

    const handleReaderClose = () => {
        setShowReader(false);
        setSelectedFragment(null);
    }

    const handleFragmentDelete = async (id: string) => {
        if (!confirm("Delete this fragment ?")) return;
        await deleteFragment(id);
        handleReaderClose();
    }

    const closingForEditRef = useRef(false);

    const handleFragmentEdit = (fragment: Fragment) => {
        closingForEditRef.current = true;
        setShowReader(false);
        setSelectedFragment(fragment);
        setCreatingFragment(true);
    }

    const handleFragmentCreate = () => {
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
                <div className="app">

                    <div className="sideBar">
                        <button><img src="android-chrome-512x512.png" alt="Logo" /></button>
                        <span></span>
                        <button id='allFragmentsButton'><img src="Icons/HomeIcon.svg" alt="" /></button>
                        <button id='collectionsButton'><img src="Icons/CollectionIcon.svg" alt="" /></button>
                        <button id='archiveButton'><img src="Icons/ArchiveIcon.svg" alt="" /></button>
                        <span></span>
                        <button id='settingsButton'><TiCog /></button>
                    </div>

                    <main>

                        <div id='searchBar'>
                            <label htmlFor="searchInput">
                                <img src="Icons/SearchIcon.svg" alt="" />
                            </label>
                            <input id='searchInput' type="text" />
                        </div>

                        <div id='fragmentContainer' className={showReader ? "reading" : undefined}>
                            {!showReader &&
                                <AnimatePresence>
                                    {fragments.map((fragment: Fragment, index: number) => (
                                        <motion.div
                                            key={fragment.id}
                                            layout
                                            layoutId={`fragment-${fragment.id}`}
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

                                            <motion.h3 transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }} layoutId={`fragmentTitle-${fragment.id}`}>{fragment.title}</motion.h3>
                                            <div className='tagContainer'>
                                                {fragment.tags.map((tag: string) => (
                                                    <p className='tag' key={tag}>{tag}</p>
                                                ))}
                                            </div>
                                            <motion.p className='fragmentText' transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }} layout="position" layoutId={`fragmentText-${fragment.id}`}>{fragment.content}</motion.p>
                                        </motion.div>))}
                                    <motion.button
                                        layout
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        id='newFragmentButton' onClick={handleFragmentCreate}><img src="Icons/PlusBlueIcon.svg" alt="" /></motion.button>
                                </AnimatePresence>

                            }

                            <AnimatePresence onExitComplete={() => {
                                if (!closingForEditRef.current) {
                                    setSelectedFragment(null);
                                }
                                closingForEditRef.current = false;
                            }}>
                                {showReader && selectedFragment != null && (
                                    <motion.div
                                        key="reader"
                                        layout
                                        layoutId={`fragment-${selectedFragment.id}`}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 30 }}
                                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                        style={{
                                            minHeight: 0,
                                            height: "80%",
                                            width: "80%"
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
                    </main>
                </div>
            </>
    )
}

export default App