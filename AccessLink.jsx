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

AccessLink.propTypes = {
  permission: propTypes.string,
  to: propTypes.oneOfType([propTypes.string, propTypes.object]),
};

export default AccessLink;
