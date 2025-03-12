import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import Results from "./components/Results";
import ProgressBars from "./components/ProgressBars";
import About from "./pages/About";

const App: React.FC = () => {
  const [faceShape, setFaceShape] = React.useState<string>("-");
  const [faceLength, setFaceLength] = React.useState<string>("-");
  const [faceWidth, setFaceWidth] = React.useState<string>("-");
  const [jawlineWidth, setJawlineWidth] = React.useState<string>("-");
  const [probabilities, setProbabilities] = React.useState<{
    [key: string]: number;
  }>({});
  const [error, setError] = React.useState<string | null>(null);

  const HomePage = () => (
    <div className="text-center p-5 bg-gray-100">
      <h1 className="text-2xl font-bold mb-5">Face Shape Detector</h1>
      {error && <p className="text-red-500 mb-5">{error}</p>}
      <FileUpload
        setFaceShape={setFaceShape}
        setFaceLength={setFaceLength}
        setFaceWidth={setFaceWidth}
        setJawlineWidth={setJawlineWidth}
        setProbabilities={setProbabilities}
        setError={setError}
      />
      <Results
        faceShape={faceShape}
        faceLength={faceLength}
        faceWidth={faceWidth}
        jawlineWidth={jawlineWidth}
      />
      <ProgressBars probabilities={probabilities} />
    </div>
  );

  return (
    <BrowserRouter>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex gap-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
