import React from 'react';

const RestaurantCard = ({ restaurant, handleEdit, handleDelete }) => {
    return (
        <div className="restaurant">
            <img src={restaurant.imageUrl || 'https://via.placeholder.com/100'} alt={restaurant.name} />
            <div className="restaurant-details">
                <strong>{restaurant.name}</strong>
                <span>{restaurant.address}</span>
                <span>{restaurant.cuisine}</span>
                <span>{restaurant.date}</span>
                {restaurant.phone && <span>{restaurant.phone}</span>}
                {restaurant.website && <a href={restaurant.website} target="_blank" rel="noopener noreferrer">{restaurant.website}</a>}
            </div>
            <div className="button-group">
                <button className="icon edit" onClick={handleEdit}>
                    <i className="fas fa-edit"></i>
                </button>
                <button className="icon delete" onClick={handleDelete}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    );
};

export default RestaurantCard;
