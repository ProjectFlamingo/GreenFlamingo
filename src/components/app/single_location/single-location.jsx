import React from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';

class SingleLocation extends React.Component {

  componentWillMount() {
    const { loadingPage } = this.props;
    loadingPage();
  }

  render() {
    const myLocation = this.props.locations.locationsList.find(
      (l) => l.Name === this.props.match.params.Name
    );

    return(
      <div>
        <h2>
          { myLocation.Name }
        </h2>

        <h2>Geographical position:</h2>
        <p>X: { myLocation.GeographicalPosition.X }</p>
        <p>Y: { myLocation.GeographicalPosition.Y }</p>

        <NavLink to={ `/categories/locations/location/${myLocation.Name}/create-event` } >
          Create event
        </NavLink>

      </div>
    );
  }
}

SingleLocation.propTypes = {
  loadingPage: PropTypes.func,

  match: PropTypes.shape({
    params: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }),

  locations: PropTypes.shape({
    locationsList: PropTypes.array,
  }),
};

export default SingleLocation;