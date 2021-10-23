import React from "react";
import { Route } from "react-router";
import { connect } from "react-redux";

import Withspinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collections-overview/collection-overview.component";
import CollectionPage from "../collections/collection.component";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firbase/firebase.utils";

import { updateCollections } from "../../redux/shop/shop.actions";

const CollOverviewWithSpinner = Withspinner(CollectionsOverview);
const CollPageWithSpinner = Withspinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    collectionRef.get().then((snapshot) => {
      const collMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispachToProps = (dispatch) => ({
  updateCollections: (collMap) => dispatch(updateCollections(collMap)),
});

export default connect(null, mapDispachToProps)(ShopPage);
