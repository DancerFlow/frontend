import './App.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
function App() {
    return (
        <>
            <ReactQueryDevtools initialIsOpen={true} />
        </>
    );
}

export default App;
