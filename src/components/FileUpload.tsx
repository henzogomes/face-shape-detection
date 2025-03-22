import React, { useRef, useState, useEffect } from "react";
import {
  createFaceMesh,
  processFaceMeshResults,
  reRenderFaceMesh,
  RenderCallbacks,
  FaceMeshResults,
} from "../utils/faceMeshProcessor";
import {
  processUploadedImage,
  displayAndProcessImage,
} from "../utils/imageProcessor";

interface FileUploadProps {
  setFaceShape: React.Dispatch<React.SetStateAction<string>>;
  setFaceLength: React.Dispatch<React.SetStateAction<string>>;
  setFaceWidth: React.Dispatch<React.SetStateAction<string>>;
  setJawlineWidth: React.Dispatch<React.SetStateAction<string>>;
  setProbabilities: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  showMeasurements: boolean;
  showFaceMesh: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFaceShape,
  setFaceLength,
  setFaceWidth,
  setJawlineWidth,
  setProbabilities,
  setError,
  showMeasurements,
  showFaceMesh,
  setIsProcessing,
}) => {
  const photoCanvasRef = useRef<HTMLCanvasElement>(null);
  const faceMeshCanvasRef = useRef<HTMLCanvasElement>(null);
  const extractedColorRef = useRef<string>("#FF0000");
  const [lastResults, setLastResults] = useState<FaceMeshResults | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create callbacks object for the rendering function
  const renderCallbacks: RenderCallbacks = {
    setError,
    setProbabilities,
    setFaceLength,
    setFaceWidth,
    setJawlineWidth,
    setFaceShape,
  };

  // Define onResults function
  const onResults = (results: any) => {
    const faceMeshCanvas = faceMeshCanvasRef.current;
    if (!faceMeshCanvas) return;

    // Use the extracted color ref
    const currentColor = extractedColorRef.current;

    // Store latest results with the current extracted color
    setLastResults({
      results,
      currentMeshColor: currentColor,
    });

    // Process and render face mesh
    processFaceMeshResults(
      results,
      faceMeshCanvas,
      currentColor,
      showMeasurements,
      renderCallbacks,
      setIsProcessing
    );
  };

  // Initialize face mesh
  const faceMesh = createFaceMesh(onResults);

  // Re-render when measurements display setting changes
  useEffect(() => {
    reRenderFaceMesh(
      lastResults,
      faceMeshCanvasRef.current,
      showMeasurements,
      renderCallbacks
    );
  }, [showMeasurements, lastResults]);

  const handleFileUpload = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!file) {
      setError("Please select a valid image file.");
      return;
    }

    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image file (JPEG, PNG, WebP).");
      return;
    }

    setIsProcessing(true); // Show processing state
    setError(null);

    const img = new Image();
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    img.src = fileUrl;

    img.onload = () => {
      const photoCanvas = photoCanvasRef.current;
      const faceMeshCanvas = faceMeshCanvasRef.current;

      if (photoCanvas && faceMeshCanvas) {
        // Process the uploaded image
        const imgProcessResult = processUploadedImage(img);

        // Store the extracted color
        extractedColorRef.current = imgProcessResult.extractedColor;

        // Display and process the image
        displayAndProcessImage(
          imgProcessResult,
          photoCanvas,
          faceMeshCanvas,
          faceMesh
        );
      }
    };
    img.onerror = () => {
      setIsProcessing(false);
      setError("Failed to load the image. Please try again.");
    };
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mt-5">
      <h1 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">
        Upload a Photo to Detect Your Face Shape With AI
      </h1>

      <div className="relative flex justify-center">
        <canvas
          ref={photoCanvasRef}
          className={`border border-gray-300 dark:border-gray-600 w-3/4 ${
            lastResults ? "" : "hidden"
          }`}
        />
        <canvas
          ref={faceMeshCanvasRef}
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none border border-gray-300 dark:border-gray-600 w-3/4 ${
            lastResults ? (showFaceMesh ? "" : "hidden") : "hidden"
          }`}
        />
      </div>

      <div
        className={`mx-auto my-5 w-3/4 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900 dark:bg-opacity-20"
            : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
        } ${lastResults ? "mt-4" : "mt-0"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        {previewUrl && !lastResults ? (
          <div className="mb-4">
            <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto" />
          </div>
        ) : null}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/webp"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-gray-400 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG, JPEG or WebP (max 10MB)
          </p>
        </div>
      </div>

      <div className="text-center">
        {lastResults ? (
          <p className="text-green-600 dark:text-green-400 text-sm">
            Image processed successfully!
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default FileUpload;
