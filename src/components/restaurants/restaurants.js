import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '../tabs';
import Restaurant from '../restaurant';
import Loader from '../loader';
import {
  loadRestaurants,
  restaurantsListSelector,
  restaurantsLoadedSelector,
} from '../../redux/features/restaurants';

const Restaurants = ({ restaurants, loaded, loadRestaurants }) => {
  useEffect(() => {
    loadRestaurants();
  }, []); // eslint-disable-line

  const match = useRouteMatch('/restaurants/:restId/:tabId');
  const tabId = match?.params.tabId || '';

  if (!loaded) return <Loader />;

  const tabs = restaurants.map(({ id, name }) => ({
    title: name,
    to: `/restaurants/${id}/${tabId}`,
  }));

  return (
    <div>
      <Tabs tabs={tabs} />
      <Switch>
        <Route path="/restaurants/:restId">
          {({ match }) => <Restaurant id={match.params.restId} />}
        </Route>
        <Redirect to={`/restaurants/${restaurants[0].id}`} />
      </Switch>
    </div>
  );
};

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

const mapStateToProps = (state) => ({
  restaurants: restaurantsListSelector(state),
  loaded: restaurantsLoadedSelector(state),
});

export default connect(mapStateToProps, { loadRestaurants })(Restaurants);
