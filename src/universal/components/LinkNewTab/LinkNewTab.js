import PropTypes from 'prop-types';
import React from 'react';

const LinkNewTab = (props) => {
  const {children, href, title} = props;
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={title}
    >
      {children}
    </a>
  );
};

LinkNewTab.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string,
  title: PropTypes.string
};

export default LinkNewTab;
