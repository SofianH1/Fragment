import './App.css'
import { useState } from 'react'
import FragmentForm from './Components/FragmentForm/FragmentForm'
import FragmentReader from './Components/FragmentReader/FragmentReader';
import type { FragmentFormData } from './Components/FragmentForm/FragmentForm.types';
import type { Fragment } from '@/types/fragment';
import { useFragments } from './hooks/useFragments';
import { TiCog } from "react-icons/ti";


function App() {

    const { fragments, loading, createFragment, updateFragment, deleteFragment } = useFragments();


    const [creatingFragment, setCreatingFragment] = useState(false);
    const [showReader, setShowReader] = useState(false);

    const [selectedFragment, setSelectedFragment] = useState<Fragment | null>(null);
    const [searchedFragments, setSearchedFragments] = useState<Fragment[]>(fragments)


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

    const handleSearchFragments = (e:any) => {
        const query = e.target.value
        if(query === ""){
            setSearchedFragments(fragments);
        }
        else{
            const frag:Fragment[] = []
            for(const f of fragments){
                if(f.content.includes(query) || f.title.includes(query)){
                    frag.push(f)
                }
            }
            setSearchedFragments(frag);
        }
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

    const handleFragmentEdit = (fragment: Fragment) => {
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
                            <input id='searchInput' type="text" onChange={(e) => { handleSearchFragments(e) }} />
                        </div>

                        <div id='fragmentContainer' className={showReader ? "reading" : undefined}>
                            {!showReader && (
                                <>
                                    {searchedFragments.map((fragment: Fragment, index: number) => (
                                        <div
                                            key={fragment.id}
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
                                        </div>))}
                                    <button id='newFragmentButton' onClick={handleFragmentCreate}><img src="Icons/PlusBlueIcon.svg" alt="" /></button>
                                </>

                            )}

                            {showReader && selectedFragment != null && (
                                <div
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
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </>
    )
}

export default App