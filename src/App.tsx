import ToastProvider from "./components/controls/Toast/ToastProvider"
import RouterContainer from "./components/RouterContainer"

function App() {

  return (
    <>
      <ToastProvider>
        <RouterContainer />
      </ToastProvider>

    </>
  )
}

export default App
