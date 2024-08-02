import React, { useState } from 'react';

const EditRestaurantModal = ({ restaurant, updateRestaurant, closeModal }) => {
    const [form, setForm] = useState({ ...restaurant });

    const handleChange = (e) => {
        if (e.target.name === 'imageUrl') {
            setForm({ ...form, [e.target.name]: URL.createObjectURL(e.target.files[0]) });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = () => {
        updateRestaurant(form);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit Restaurant</h2>
                    <span className="close" onClick={closeModal}>&times;</span>
                </div>
                <div className="modal-body">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="cuisine"
                        value={form.cuisine}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        name="imageUrl"
                        onChange={handleChange}
                    />
                </div>
                <button onClick={handleSubmit}>Update</button>
            </div>
        </div>
    );
};

export default EditRestaurantModal;
