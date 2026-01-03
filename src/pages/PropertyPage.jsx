import { useParams } from "react-router-dom";
import { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PropertyPage({ properties, favourites, addToFavourites }) {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const isFavourite = favourites.includes(property.id);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!property) return <p>Property not found</p>;

  const nextImage = () => {
    setCurrentIndex((i) => (i === property.images.length - 1 ? 0 : i + 1));
  };

  const prevImage = () => {
    setCurrentIndex((i) => (i === 0 ? property.images.length - 1 : i - 1));
  };

  return (
    <div className="property-page">
      <h2 className="property-title">{property.type}</h2>

      {/* Image Carousel */}
      <div className="carousel">
        <img
          src={`/${property.images[currentIndex]}`}
          alt={`Property ${currentIndex + 1}`}
          className="carousel-image"
        />

        <button className="carousel-btn left" onClick={prevImage}>
          ‹
        </button>

        <button className="carousel-btn right" onClick={nextImage}>
          ›
        </button>
      </div>

      <div className="property-details">
        <p>
          <strong>Price:</strong> £{property.price.toLocaleString()}
        </p>
        <p>
          <strong>Location:</strong> {property.location}
        </p>
        <p>
          <strong>Bedrooms:</strong> {property.bedrooms}
        </p>

        <button
          className={`favourite-btn ${isFavourite ? "remove" : ""}`}
          onClick={() => addToFavourites(property.id)}
        >
          {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
        </button>
      </div>

      {/* Tabs */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <p>{property.description}</p>
        </TabPanel>

        <TabPanel>
          <img
            src={`/${property.floorPlan}`}
            alt="Floor plan"
            className="floor-plan"
          />
        </TabPanel>

        <TabPanel>
          <iframe
            src={property.mapEmbed}
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyPage;
