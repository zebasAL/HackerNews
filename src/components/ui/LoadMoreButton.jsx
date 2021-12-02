import React from 'react';
import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

const LoadMoreButton = ({
  handleLoadingButton,
  isLoading,
  styles,
  children,
}) => (
  <div className="load-more-button">
    <Stack direction="row" spacing={2}>
      <LoadingButton
        data-testid="loadButton"
        sx={styles}
        loading={isLoading}
        variant="contained"
        onClick={(e) => handleLoadingButton(e)}
      >
        {children}
      </LoadingButton>
    </Stack>
  </div>
);

LoadMoreButton.propTypes = {
  handleLoadingButton: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  styles: PropTypes.shape((PropTypes.string)),
  children: PropTypes.node,
};

LoadMoreButton.defaultProps = {
  isLoading: true,
  styles: {
    minWidth: '45px', width: '45px', height: '40px', borderRadius: '100%', backgroundColor: '#ff6c37', marginTop: '20px', marginBottom: '20px',
  },
  children: '',
};

export default LoadMoreButton;
