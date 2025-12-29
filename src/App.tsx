import { HashRouter } from "react-router-dom"
import ToastProvider from "./components/controls/Toast/ToastProvider"
import RouterContainer from "./components/RouterContainer"

function App() {

  return (
    <>
      <ToastProvider>
        <HashRouter>
          <RouterContainer />
        </HashRouter>
      </ToastProvider>

    </>
  )
}

export default App
