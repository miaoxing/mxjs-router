import propTypes from 'prop-types';
import {Access} from '@mxjs/auth';
import Link from './Link';

const AccessLink = ({permission, ...props}) => {
  return (
    <Access permission={permission || props.to}>
      <Link {...props}/>
    </Access>
  );
};

AccessLink.props = {
  permission: propTypes.string,
};

export default AccessLink;
