import React, {lazy} from 'react';
import PropTypes from 'prop-types';

const ListView = lazy(() => import('./ListView'));
const ListFooter = lazy(() => import('./ListFooter'));

const AppList = ({footerProps, ...props}) => {
  return (
    <ListView
      {...props}
      ListFooterComponent={
        footerProps ? (
          <ListFooter
            loading={footerProps.loading}
            footerText={footerProps.footerText}
          />
        ) : null
      }
    />
  );
};

export default AppList;
AppList.propTypes = {
  border: PropTypes.bool,
  containerStyle: PropTypes.object,
  ListEmptyComponent: PropTypes.node,
  ListFooterComponent: PropTypes.node,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func,
};
AppList.defaultProps = {
  border: false,
  data: [],
};
