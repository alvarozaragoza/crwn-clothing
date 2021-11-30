import React from "react";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

// used before loading data in reducer
// import { updateCollections } from "../../redux/shop/shop.actions";
// import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
// import { selectCollections } from "../../redux/shop/shop.selectors";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

// Before move colletions to Firebase
// const ShopPage = ({ match }) => (
//   <div className='shop-page'>
//     <Route exact path={`${match.path}`} component={CollectionsOverview} />
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//   </div>
// );

// MOVED TO REDUCER
// import {
//   firestore,
//   convertCollectionsSnapshotToMap,
// } from "../../firebase/firebase.utils";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }
  
  // REMOVED BECAUSE LOADING WENT TO REDUCER
  // *****

  // state = {
  //   loading: true,
  // };

  // unsubscribeFromSnapshot = null;

  // componentDidMount() {
  //   const { updateCollections } = this.props;
  //   const collectionRef = firestore.collection("collections");

  //   /* firebase.onSnapshot
  //   collectionRef.onSnapshot(async (snapshot) => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     updateCollections(collectionsMap);
  //     this.setState({ loading: false });
  //   });
  //   */

  //   // firebase.get()
  //   collectionRef.get().then((snapshot) => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     updateCollections(collectionsMap);
  //     this.setState({ loading: false });
  //   });

  //   /* it is possible to use fetch, but the object returned is too much nested, and we would have to parse
  //   fetch('https://firestore.googleapis.com/v1/projects/crwn-db-ec80d/databases/(default)/documents/collections')
  //   .then(response => response.json())
  //   .then(collections => console.log(collections));
  //   */
  // }
  // ***

  render() {
    const { match, isCollectionFetching } = this.props;

    // Before loading data in reducer
    // const { loading } = this.state;
    // return (
    //   <div className="shop-page">
    //     <Route
    //       exact
    //       path={`${match.path}`}
    //       render={(props) => (
    //         <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
    //       )}
    //     />
    //     <Route
    //       path={`${match.path}/:collectionId`}
    //       render={(props) => (
    //         <CollectionsPageWithSpinner isLoading={loading} {...props} />
    //       )}
    //     />
    //   </div>
    // );
    
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionsPageWithSpinner isLoading={isCollectionFetching} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,

});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

// Before loading data in reducer
// const mapDispatchToProps = (dispatch) => ({
//   updateCollections: (collectionsMap) =>
//     dispatch(updateCollections(collectionsMap)),
// });

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
