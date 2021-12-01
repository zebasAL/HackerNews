import React from 'react';
import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PropTypes from 'prop-types';

const LoadMoreButton = ({
  handleLoadingButton,
  isLoading,
}) => (
  <div className="load-more-button">
    <Stack direction="row" spacing={2}>
      <LoadingButton
        sx={{ height: '40px', borderRadius: '100%', backgroundColor: '#ff6c37' }}
        loading={isLoading}
        variant="contained"
        onClick={(e) => handleLoadingButton(e)}
      >
        {!isLoading ? (<KeyboardArrowDownIcon sx={{ color: '#fdfdfd', fontSize: '30px' }} />) : null}
      </LoadingButton>
    </Stack>
  </div>
);

LoadMoreButton.propTypes = {
  handleLoadingButton: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

LoadMoreButton.defaultProps = {
  isLoading: true,
};

export default LoadMoreButton;
