import React, { useState } from 'react';
import RestaurantForm from './components/RestaurantForm';
import RestaurantCard from './components/RestaurantCard';
import EditRestaurantModal from './components/EditRestaurantModal';
import SearchBar from './components/SearchBar';
import './styles.css';

const App = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [sortType, setSortType] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [editId, setEditId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const addRestaurant = (newRestaurant) => {
        setRestaurants([...restaurants, { ...newRestaurant, id: Date.now() }]);
    };

    const updateRestaurant = (updatedRestaurant) => {
        setRestaurants(restaurants.map((r) => (r.id === editId ? { ...updatedRestaurant, id: editId } : r)));
        setEditId(null);
    };

    const deleteRestaurant = (id) => {
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
            <RestaurantForm addRestaurant={addRestaurant} />
            <div>
                <label>Sort by: </label>
                <select value={sortType} onChange={handleSortChange} className="sort-by">
                    <option value="name">Name</option>
                    <option value="date">Upload Date</option>
                    <option value="cuisine">Cuisine</option>
                </select>
                <button onClick={handleSortOrderChange}>
                    {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </button>
            </div>
            <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
            <div className="restaurant-list">
                {sortedRestaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        handleEdit={() => setEditId(restaurant.id)}
                        handleDelete={() => deleteRestaurant(restaurant.id)}
                    />
                ))}
            </div>
            {editId && (
                <EditRestaurantModal
                    restaurant={restaurants.find((r) => r.id === editId)}
                    updateRestaurant={updateRestaurant}
                    closeModal={() => setEditId(null)}
                />
            )}
        </div>
    );
};

export default App;