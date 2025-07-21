import React, { useState } from "react";
import "./image.css";
import './login.css';
import InputFileUpload from "./FileUpload";

export default function ImageUploading() {
    const [backgroundImage, setBackgroundImage] = useState("");
    const [imageDescription, setImageDescription] = useState("");
    const phrases = [
        "This image says...",
        "The image speaks...",
        "Interpreting the visual...",
        "From the image's perspective...",
        "Decoding the image...",
        "What the image tells us...",
        "The image suggests...",
        "Through the image's lens...",
        "Translating the visual...",
        "The visual narrative..."
    ];

    const heading = phrases[Math.floor(Math.random() * phrases.length)];

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.error("No file provided.");
            return;
        }

        const reader = new FileReader();

        reader.onload = async (event) => {
            if (event.target && event.target.result) {
                const imgUrl = event.target.result;
                setBackgroundImage(imgUrl);
            } else {
                console.error("Failed to read the file content.");
                return;
            }
        };

        reader.onerror = (error) => {
            console.error("Error reading the file:", error);
            return;
        };

        reader.readAsDataURL(file);

        // Send the image to the server
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://my-flask-app-example-27aadddcf55f.herokuapp.com/predict', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const responseData = await response.json();
            setImageDescription(responseData.result);

        } catch (error) {
            console.error("There was an error sending the image:", error);
        }
    };

    return (
        <>
            <div className="wrapper">
                <div className="container main">
                    <div className="vertical-align">

                        <div className="row">
                            <div className="col-md-6 side-imag"
                                 style={{ backgroundImage: `url(${backgroundImage})` }}
                            >
                            </div>
                            <div className="col-md-6">
                                {imageDescription && (
                                    <div className="response-content">
                                        <h3>{heading}</h3>
                                        <p>{imageDescription}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="upload-btn-wrapper">
                            <InputFileUpload onChange={handleImageUpload} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
