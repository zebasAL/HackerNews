import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import PropTypes from 'prop-types';

const AccordionContainer = ({
  handleChange,
  accordionId,
  childrenSummary,
  childrenDetails,
  expandedId,
}) => (
  <div className="story-posts-container">
    <Accordion
      className="story-posts-wrapper"
      disableGutters
      expanded={expandedId === accordionId}
      onChange={(e) => handleChange(e)}
    >
      <AccordionSummary expandIcon={null} aria-controls="panel1bh-content" id="panel1bh-header">
        {childrenSummary}
      </AccordionSummary>
      <AccordionDetails>
        {childrenDetails}
      </AccordionDetails>
    </Accordion>
  </div>
);

AccordionContainer.propTypes = {
  handleChange: PropTypes.func.isRequired,
  accordionId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  expandedId: PropTypes.number.isRequired,
  childrenSummary: PropTypes.node,
  childrenDetails: PropTypes.node,
};

AccordionContainer.defaultProps = {
  childrenSummary: '',
  childrenDetails: '',
};

export default AccordionContainer;
