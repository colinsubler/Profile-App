import {useState} from 'react';
import '../styles/addprofile.module.css';

const stripTags = (s) => s.replace(/<\/?[^>]+(>|$)/g, "");
const trimCollapse = (s) => String(s ?? "").replace(/\s+/g, ' ').trim();
const initialValues = {
        name: '',
        title: '',
        email: '',
        bio: '',
        img: null
    }

const AddProfile = ({addProfiles}) => {
    const [values, setValues] = useState(initialValues);
    
    const {name, title, email, bio, img} = values;
    const [errors, setErrors] = useState({img: '', general: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState("");

    const onChange = (e) => {
        if (e.target.name === 'img') {
            const file = e.target.files[0];
            if (file && file.size < 1024 * 1024) {
                setValues(prev => ({...prev, img: file}));
                setErrors(prev => ({...prev, img: ''}));
            } else {
                setValues(prev => ({...prev, img: null}));
                setErrors(prev => ({...prev, img: "File is too large. Max size is 1MB."}));
            }
        } else {
            setValues(prev => ({...prev, [e.target.name]: e.target.value}));
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!img) {
                setErrors(prev => ({...prev, general: "Please select a valid image file."}));
                setIsSubmitting(false);
                return;
            }

            const cleanedValues = {
                name: trimCollapse(stripTags(name)),
                title: trimCollapse(stripTags(title)),
                email: trimCollapse(stripTags(email)),
                bio: stripTags(bio).trim(),
                imgSrc: URL.createObjectURL(img)
            };

            addProfiles(cleanedValues);
            setSuccess("Profile added successfully!");
            setValues(initialValues);
            setTimeout(() => setSuccess(""), 3000);
            e.currentTarget.reset();

        } catch (error) {
            console.error("Error creating profile:", error);
            setErrors(prev => ({...prev, general: "Something went wrong!"}));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-profile">
            <h2>Add Profile</h2>
            <form onSubmit={(handleSubmit)}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={onChange} required />
                
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={title} onChange={onChange} required />
                
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={onChange} required />
                
                <label htmlFor="bio">Bio:</label>
                <textarea id="bio" name="bio" value={bio} onChange={onChange} required></textarea>
                
                <label htmlFor="img">Image:</label>
                <input type="file" id="img" name="img" accept="image/*" onChange={onChange} required />
                
                {errors.img && <p className="error">{errors.img}</p>}
                {errors.general && <p className="error">{errors.general}</p>}
                {success && <p className="success">{success}</p>}
                
                <button type="submit" disabled={isSubmitting || 
                    !trimCollapse(stripTags(name)) ||
                    !trimCollapse(stripTags(title)) ||
                    !trimCollapse(stripTags(email)) ||
                    !stripTags(bio).trim() ||
                    !img}>
                    Add Profile
                </button>
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    )
}

export default AddProfile;