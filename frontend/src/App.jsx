import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LibrariesIndex from './pages/LibrariesIndex'
import LibraryDetail from './pages/LibraryDetail'
import ToolsMarketplace from './pages/ToolsMarketplace'
import Sandbox from './pages/Sandbox'
import Tutorials from './pages/Tutorials'
import Documentation from './pages/Documentation'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-surface-950">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/libraries" element={<LibrariesIndex />} />
          <Route path="/libraries/:id" element={<LibraryDetail />} />
          <Route path="/tools" element={<ToolsMarketplace />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
