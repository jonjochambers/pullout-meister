import "./styles.css";
import { PullOutManagerProvider } from "./contexts/PullOutManagerContext";
import POM from "./components/PullOut/PullOutMeister";
import PullOuts from "./components/PullOut/PullOuts";

export default function App() {
  return (
    <PullOutManagerProvider>
      <div className="App">
        <h1>PullOut Test</h1>
        <h2>A complete and reasonably dynamic pullout component and context</h2>
        <PullOuts />
        <POM />
      </div>
    </PullOutManagerProvider>
  );
}
