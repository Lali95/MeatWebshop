import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import images from '../assets/images'; // Import the images
import '../Css/OrderItemCard.css';

function OrderItemCard({ item }) {
  const { t } = useTranslation();

  // Get the image URL based on the item's type
  const imageUrl = images[item.type.toLowerCase()] || images.meats; // Default to sausage image if type is not found

  return (
    <div className="order-item-card">
      <div className="order-item-card-image">
        <img src={imageUrl} alt={item.name} />
      </div>
      <div className="order-item-card-details">
        <h3>{item.name}</h3>
        <p>{t('price')}: ${item.price.toFixed(2)}</p>
        <p>{t('quantity')}: {item.quantity}</p>
        <p>{t('type')}: {item.type}</p>
      </div>
    </div>
  );
}

OrderItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderItemCard;
