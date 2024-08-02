import React, { useState } from 'react';

const RestaurantForm = ({ addRestaurant }) => {
    const [form, setForm] = useState({ name: '', address: '', cuisine: '', date: '', phone: '', website: '', imageUrl: '' });

    const handleChange = (e) => {
        if (e.target.name === 'imageUrl') {
            setForm({ ...form, [e.target.name]: URL.createObjectURL(e.target.files[0]) });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addRestaurant(form);
        setForm({ name: '', address: '', cuisine: '', date: '', phone: '', website: '', imageUrl: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Restaurant Name"
                required
            />
            <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                required
            />
            <input
                type="text"
                name="cuisine"
                value={form.cuisine}
                onChange={handleChange}
                placeholder="Cuisine"
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
                placeholder="Phone Number"
            />
            <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="Website"
            />
            <input
                type="file"
                name="imageUrl"
                onChange={handleChange}
            />
            <button type="submit">Add Restaurant</button>
        </form>
    );
};

export default RestaurantForm;
