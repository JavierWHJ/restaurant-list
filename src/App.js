import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const App = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [form, setForm] = useState({ name: '', address: '', cuisine: '', date: '', phone: '', website: '', imageUrl: '' });
    const [sortType, setSortType] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', address: '', cuisine: '', date: '', phone: '', website: '', imageUrl: '' });
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        if (e.target.name === 'imageUrl') {
            setForm({ ...form, [e.target.name]: URL.createObjectURL(e.target.files[0]) });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleAddRestaurant = () => {
        setRestaurants([...restaurants, { ...form, id: Date.now() }]);
        setForm({ name: '', address: '', cuisine: '', date: '', phone: '', website: '', imageUrl: '' });
    };

    const handleEditChange = (e) => {
        if (e.target.name === 'imageUrl') {
            setEditForm({ ...editForm, [e.target.name]: URL.createObjectURL(e.target.files[0]) });
        } else {
            setEditForm({ ...editForm, [e.target.name]: e.target.value });
        }
    };

    const handleEditRestaurant = (id) => {
        const restaurant = restaurants.find((r) => r.id === id);
        setEditId(id);
        setEditForm({ name: restaurant.name, address: restaurant.address, cuisine: restaurant.cuisine, date: restaurant.date, phone: restaurant.phone, website: restaurant.website, imageUrl: restaurant.imageUrl });
    };

    const handleUpdateRestaurant = () => {
        setRestaurants(restaurants.map((r) => (r.id === editId ? { ...editForm, id: editId } : r)));
        setEditId(null);
        setEditForm({ name: '', address: '', cuisine: '', date: '', phone: '', website: '', imageUrl: '' });
    };

    const handleDeleteRestaurant = (id) => {
        setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    };

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    const handleSortOrderChange = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredRestaurants = restaurants.filter((restaurant) => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedRestaurants = filteredRestaurants.sort((a, b) => {
        let comparison = 0;
        if (sortType === 'name') {
            comparison = a.name.localeCompare(b.name);
        } else if (sortType === 'date') {
            comparison = new Date(a.date) - new Date(b.date);
        } else if (sortType === 'cuisine') {
            comparison = a.cuisine.localeCompare(b.cuisine);
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });

    return (
        <div className="container">
            <h1>Restaurant List</h1>
            <form onSubmit={(e) => e.preventDefault()}>
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
                <button type="button" onClick={handleAddRestaurant}>
                    Add Restaurant
                </button>
            </form>
            <div>
                <label>Sort by: </label>
                <select value={sortType} onChange={handleSortChange}>
                    <option value="name">Name</option>
                    <option value="date">Upload Date</option>
                    <option value="cuisine">Cuisine</option>
                </select>
                <button onClick={handleSortOrderChange}>
                    {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </button>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="restaurant-list">
                {sortedRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="restaurant">
                        <img src={restaurant.imageUrl || 'https://via.placeholder.com/100'} alt={restaurant.name} />
                        {editId === restaurant.id ? (
                            <div className="modal">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h2>Edit Restaurant</h2>
                                        <span className="close" onClick={() => setEditId(null)}>&times;</span>
                                    </div>
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name}
                                            onChange={handleEditChange}
                                        />
                                        <input
                                            type="text"
                                            name="address"
                                            value={editForm.address}
                                            onChange={handleEditChange}
                                        />
                                        <input
                                            type="text"
                                            name="cuisine"
                                            value={editForm.cuisine}
                                            onChange={handleEditChange}
                                        />
                                        <input
                                            type="date"
                                            name="date"
                                            value={editForm.date}
                                            onChange={handleEditChange}
                                        />
                                        <input
                                            type="text"
                                            name="phone"
                                            value={editForm.phone}
                                            onChange={handleEditChange}
                                        />
                                        <input
                                            type="text"
                                            name="website"
                                            value={editForm.website}
                                            onChange={handleEditChange}
                                        />
                                        <input
                                            type="file"
                                            name="imageUrl"
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    <button onClick={handleUpdateRestaurant}>Update</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="restaurant-details">
                                    <strong>{restaurant.name}</strong>
                                    <span>{restaurant.address}</span>
                                    <span>{restaurant.cuisine}</span>
                                    <span>{restaurant.date}</span>
                                    {restaurant.phone && <span>{restaurant.phone}</span>}
                                    {restaurant.website && <a href={restaurant.website} target="_blank" rel="noopener noreferrer">{restaurant.website}</a>}
                                </div>
                                <div className="button-group">
                                    <button className="icon edit" onClick={() => handleEditRestaurant(restaurant.id)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="icon delete" onClick={() => handleDeleteRestaurant(restaurant.id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
