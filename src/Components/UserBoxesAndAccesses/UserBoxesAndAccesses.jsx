import React, {useState, useEffect} from 'react';

export function UserBoxesAndAccesses(props) {
    const [selectedFiles, setSelectedFiles] = useState({});
    const [uploadedImages, setUploadedImages] = useState({});

    useEffect(() => {
        // Check if a .bin file exists for each boxId
        props.userBoxes.forEach(async (box) => {
            try {
                const response = await fetch(`${props.API_ENV}/checkBinFile/${box.BoxId}`);
                const data = await response.json();

                if (data.exists) {
                    const bmpResponse = await fetch(`${props.API_ENV}/getBMPImage/${box.BoxId}`);
                    const bmpBlob = await bmpResponse.blob();
                    const bmpUrl = URL.createObjectURL(bmpBlob);
                    setUploadedImages((prevImages) => ({...prevImages, [box.BoxId]: bmpUrl}));
                }
            } catch (error) {
                console.error("Error checking .bin file:", error);
            }
        });
    }, [props.userBoxes, props.API_ENV]);

    const handleFileChange = (event, boxId) => {
        const file = event.target.files[0];
        setSelectedFiles((prevFiles) => ({...prevFiles, [boxId]: file}));
    };

    const handleFileUpload = async (boxId) => {
        const file = selectedFiles[boxId];

        if (!file) {
            console.error("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${props.API_ENV}/saveBMP/${boxId}`, {
                method: 'POST', body: formData,
            });

            if (response.ok) {
                console.log(`Image for Box Id ${boxId} uploaded successfully`);
                const bmpResponse = await fetch(`${props.API_ENV}/getBMPImage/${boxId}`);
                const bmpBlob = await bmpResponse.blob();
                const bmpUrl = URL.createObjectURL(bmpBlob);
                setUploadedImages((prevImages) => ({...prevImages, [boxId]: bmpUrl}));
            } else {
                console.error(`Failed to upload image for Box Id ${boxId}`);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (<div className="box">
            <h2>Your boxes:</h2>
            <div className="user">
                {props.userBoxes.map((box) => (<div key={box.BoxId}>
                        {uploadedImages[box.BoxId] ? (
                            <img src={uploadedImages[box.BoxId]} alt={`Box Id ${box.BoxId}`}/>) : (<>
                                <input
                                    type="file"
                                    accept=".bmp"
                                    onChange={(event) => handleFileChange(event, box.BoxId)}
                                />
                                <button onClick={() => handleFileUpload(box.BoxId)}>Upload Image</button>
                            </>)}
                        <p style={{color: "#DF2E38"}}>Box Id: {box.BoxId}</p>
                        {/* Display other information about the box */}
                    </div>))}
            </div>
        </div>);
}
