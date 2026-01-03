import { Link } from "react-router-dom";

function ResultsList({ properties }) {
  return (
    <div className="results-grid">
      {" "}
      {/* this class matches the CSS grid */}
      {properties.map((prop) => (
        <div key={prop.id} className="property-card">
          {" "}
          {/* matches card CSS */}
          <img src={prop.picture} alt={prop.type} />
          <div className="card-body">
            <div className="price">£{prop.price.toLocaleString()}</div>

            <div className="location">{prop.location}</div>

            <div className="short-desc">
              {prop.description.slice(0, 120)}...
            </div>

            <Link to={`/property/${prop.id}`} className="view-btn">
              View Property
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultsList;
