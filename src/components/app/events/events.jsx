import React from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './events.scss';
import moment from 'moment';

class Events extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { loadEvents } = this.props;
    loadEvents();
  }

  render() {
    const { eventList } = this.props.events;
    eventList.sort(function(a, b) {
      var eventA = a.datetime;
      var eventB = b.datetime;
      return (eventA < eventB) ? -1 : (eventA > eventB) ? 1 : 0;
    });

    return (
      <div>
        <center>
          <h2>
            Upcomming events
          </h2>
        </center>
        <ul className='list-events'>
          { eventList.map(
              (event, i) => (
                <li className='list-group-item' key={ i }>
                  <NavLink to={ `/events/${event.id}` } >
                    { event.title + ", " + moment().calendar(event.datetime, {
                      sameDay: '[Idag]',
                      lastDay: '[Imorgon]',
                      sameElse: moment(event.datetime).format('YYYY-MM-DD'),
                    }) + " " + moment(event.datetime).format("HH:mm")}
                  </NavLink>
                </li>
              )
          )}
        </ul>
      </div>
    );
  }
  componentWillUnmount() {
    const { actions } = this.props;
    actions.clearEvents();
  }
}

Events.propTypes = {
  url: PropTypes.string,
  user: PropTypes.shape({
    authenticated: PropTypes.bool,
  }),
  loadEvents: PropTypes.func,
  actions: PropTypes.shape({
    loadingPage: PropTypes.func,
    loadUserEvents: PropTypes.func,
    clearEvents: PropTypes.func,
  }),
  events: PropTypes.shape({
    eventList: PropTypes.array,
  }),
  byLocation: PropTypes.bool,
};

export default CSSModules(Events, styles);
