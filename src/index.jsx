import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import { Container } from 'react-bootstrap';
// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <Container fluid className="no-padding-margin" > 
    <MainView />
   </Container>
)};

// Finds the root of  app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render  app in the root DOM element
root.render(<MyFlixApplication />);