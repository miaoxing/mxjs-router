import {Link as RouterLink} from 'react-router-dom';
import {createLocation} from 'history';
import PropTypes from 'prop-types';
import ModalContext from './ModalContext';

function Link({to, modal, autoModal, ...props}) {
  const location = createLocation(to, {modal});

  if (!autoModal) {
    return <RouterLink to={location} {...props}/>;
  }

  // 分开减少层级和逻辑
  return <ModalContext.Consumer>
    {({isModal}) => {
      location.state.modal = modal || (isModal && autoModal);
      return <RouterLink to={location} {...props}/>;
    }}
  </ModalContext.Consumer>;
}

Link.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  modal: PropTypes.bool,
  autoModal: PropTypes.bool,
};

export default Link;
