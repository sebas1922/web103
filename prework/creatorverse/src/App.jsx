import { Routes, Route } from 'react-router-dom'
import styles from './App.module.css'
import Navbar from './components/Navbar/Navbar'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<ShowCreators />} />
          <Route path="/creators/:id" element={<ViewCreator />} />
          <Route path="/creators/new" element={<AddCreator />} />
          <Route path="/creators/:id/edit" element={<EditCreator />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
