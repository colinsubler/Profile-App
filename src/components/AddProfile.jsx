import React, { useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilesContext from '../components/ProfilesContext';
import styles from '../styles/addprofile.module.css';

const stripTags = (s) => s.replace(/<\/?[^>]+(>|$)/g, "");
const trimCollapse = (s) => String(s ?? "").replace(/\s+/g, ' ').trim();

const initialValues = {
  name: '',
  title: '',
  email: '',
  bio: '',
  img: null
};

const initialState = {
  values: initialValues,
  errors: { img: '', general: '' },
  isSubmitting: false,
  success: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, values: { ...state.values, [action.field]: action.value } };
    case 'SET_IMG':
      return { ...state, values: { ...state.values, img: action.file }, errors: { ...state.errors, img: action.error || '' } };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, ...action.payload } };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'SET_SUCCESS':
      return { ...state, success: action.payload };
    case 'RESET_FORM':
      return { ...initialState };
    default:
      return state;
  }
}

const AddProfile = () => {
  const { addProfile } = useContext(ProfilesContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { values, errors, isSubmitting, success } = state;
  const { name, title, email, bio, img } = values;

  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === 'img') {
      const file = e.target.files[0];
      if (file && file.size < 1024 * 1024) {
        dispatch({ type: 'SET_IMG', file, error: '' });
      } else {
        dispatch({ type: 'SET_IMG', file: null, error: "File is too large. Max size is 1MB." });
      }
    } else {
      dispatch({ type: 'SET_VALUE', field: e.target.name, value: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SUBMITTING', payload: true });

    try {
      if (!img) {
        dispatch({ type: 'SET_ERROR', payload: { general: "Please select a valid image file." } });
        dispatch({ type: 'SET_SUBMITTING', payload: false });
        return;
      }

      const cleanedValues = {
        name: trimCollapse(stripTags(name)),
        title: trimCollapse(stripTags(title)),
        email: trimCollapse(stripTags(email)),
        bio: stripTags(bio).trim(),
        imgSrc: URL.createObjectURL(img),
      };

      addProfile(cleanedValues);

      dispatch({ type: 'SET_SUCCESS', payload: "Profile added successfully!" });
      dispatch({ type: 'RESET_FORM' });
      e.currentTarget.reset();

      setTimeout(() => {
        dispatch({ type: 'SET_SUCCESS', payload: "" });
        navigate("/local-profiles");
      }, 1000);

    } catch (error) {
      console.error("Error creating profile:", error);
      dispatch({ type: 'SET_ERROR', payload: { general: "Something went wrong!" } });
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  };

  return (
    <div className={styles['add-profile']}>
      <h1>Add Profile</h1>
      <form onSubmit={handleSubmit} className={styles['form-container']}>
        {/* First Line */}
        <div className={styles['form-row']}>
          <div className={styles['form-group']}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={onChange} required />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={title} onChange={onChange} required />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={onChange} required />
          </div>
        </div>

        {/* Second Line */}
        <div className={styles['form-row']}>
          <div className={`${styles['form-group']} ${styles['bio-group']}`}>
            <label htmlFor="bio">Bio:</label>
            <textarea id="bio" name="bio" value={bio} onChange={onChange} required></textarea>
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="img">Image:</label>
            <input type="file" id="img" name="img" accept="image/*" onChange={onChange} required />
          </div>
          <div className={`${styles['form-group']} ${styles['submit-group']}`}>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !trimCollapse(stripTags(name)) ||
                !trimCollapse(stripTags(title)) ||
                !trimCollapse(stripTags(email)) ||
                !stripTags(bio).trim() ||
                !img
              }
            >
              Add Profile
            </button>
          </div>
        </div>

        {errors.img && <p className={styles['error']}>{errors.img}</p>}
        {errors.general && <p className={styles['error']}>{errors.general}</p>}
        {success && <p className={styles['success']}>{success}</p>}
      </form>
    </div>
  );
};

export default AddProfile;
