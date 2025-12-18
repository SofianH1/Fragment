import { mockFragments } from './Mock/mockFragments'
import './App.css'


function App() {

  return (
    <>
      <div id='fragmentContainer'>
        {mockFragments.map(fragment => (
          <div className='fragment'>
            <h3>{fragment.title}</h3>
            {fragment.tags.map(tag => (
              <p className='tag'>{tag}</p>
            ))}
            <p><b>{fragment.content}</b></p>
          </div>))}
      </div>
    </>
  )
}

export default App
