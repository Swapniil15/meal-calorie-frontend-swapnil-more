import { AuthForm } from "../components/AuthForm";
import { DarkModeToggle } from "../components/DarkModeToggle";


function App() {
  return (
    <>
      <DarkModeToggle />
      <AuthForm type="login" /> {/* or "register" */}
    </>
  );
}

export default App;
