import React, {useRef} from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

function FileUploadForm({ user, uploadedFileType, button }) {
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (fileInputRef.current?.value ?? null) {
            // create a new FormData object
            const formData = new FormData();
            // append the file to the FormData object
            formData.append('file', fileInputRef.current.files[0]);
            formData.append('user', user);

            if (uploadedFileType === 'profile') {
                window.localStorage.setItem('profile-image-synced', 'false');
            }

            // send the FormData object to the Symfony API
            try {
                const response = await axios.post(`/api/upload/${uploadedFileType}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('File has been uploaded successfully!');

                setTimeout(() => {
                    location.reload();
                }, 1500);
            } catch (error) {
                toast.error('Something went wrong... Please try again later');
                console.error(error);
            }
        } else {
            toast.error('No file chosen');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className='mb-2' type="file" ref={fileInputRef} />
            {button}
        </form>
    );
}

export default FileUploadForm;