import { useLinkClickHandler } from 'react-router-dom';
import { createLocation } from 'history';
import PropTypes from 'prop-types';
import ModalContext from './ModalContext';
import React from 'react';
import { useHref } from 'react-router';

const BaseLink = React.forwardRef((
    {
      onClick,
      replace = false,
      state,
      target,
      to,
      component: Component = 'a',
      ...rest
    }, ref
  ) => {
    let href = useHref(to);
    let handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
    });

    return (
      <Component
        {...rest}
        href={href}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            handleClick(event);
          }
        }}
        ref={ref}
        target={target}
      />
    );
  }
);

BaseLink.propTypes = {
  onClick: PropTypes.func,
  replace: PropTypes.bool,
  state: PropTypes.object,
  target: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  component: PropTypes.elementType,
};

const Link = ({ to, modal, autoModal, ...props }) => {
  const location = createLocation(to, { modal });

  if (!autoModal) {
    return <BaseLink to={location} {...props}/>;
  }

  // 分开减少层级和逻辑
  return <ModalContext.Consumer>
    {({ isModal }) => {
      location.state.modal = modal || (isModal && autoModal);
      return <BaseLink to={location} {...props}/>;
    }}
  </ModalContext.Consumer>;
};

Link.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  modal: PropTypes.bool,
  autoModal: PropTypes.bool,
};

export default Link;
