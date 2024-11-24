import { Outlet } from 'react-router';
import './App.css';
import { Header } from './shared/ui/components/header/ui.header';
import { Footer } from './shared/ui/components/footer/footer';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow mt-4">
        <Outlet />
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}

export default App;
