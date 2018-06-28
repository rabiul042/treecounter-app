import React from 'react';
import PropTypes from 'prop-types';

import UserSynopsis from '../Common/UserSynopsis';
import UserHomepageLink from '../Common/UserHomepageLink';
import ArcGISContributionsMap from '../Map/ArcGISContributionsMap';

/**
 * MapIds:
 *   - d601683709dc415b99ddc1bc66a6d8eb
 *   - 534da741b327459eb117f4cc93acd98e
 */
const UserFootprint = ({ userProfile }) => {
  return (
    <div>
      <UserSynopsis
        synopsis1={userProfile.synopsis1}
        synopsis2={userProfile.synopsis2}
      />
      <UserHomepageLink
        homepageUrl={userProfile.url}
        caption={userProfile.homepageCaption}
      />
      <ArcGISContributionsMap
        webMapId={'d601683709dc415b99ddc1bc66a6d8eb'}
        userId={userProfile.id}
      />
      {/*<UserBarChart contributions={userProfile.contributions} />*/}
    </div>
  );
};

UserFootprint.propTypes = {
  userProfile: PropTypes.object.isRequired
};

export default UserFootprint;
