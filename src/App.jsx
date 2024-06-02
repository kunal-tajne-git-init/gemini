import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./components/Layout/Layout";
import ContextProvider from "./context/Context.jsx";

function App() {
  return (
    <>
      <ContextProvider>
        <Sidebar />
        <Layout />
      </ContextProvider>
    </>
  );
}

export default App;
