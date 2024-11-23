import { Outlet } from 'react-router';
import './App.css';
import { Header } from './shared/ui/components/header/ui.header';

function App() {
  return (
    <div className="flex flex-col gap-2">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
