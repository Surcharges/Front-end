import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Box } from '@mui/material';

interface Props {
  imageName: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newSurchargeAmount: number | undefined, newTotalAmount: number | undefined, action: string) => Promise<void>;
}

const ConfirmationModal: React.FC<Props> = ({ imageName, isOpen, onClose, onConfirm }) => {
  const [newSurchargeAmount, setNewSurchargeAmount] = useState('');
  const [newTotalAmount, setNewTotalAmount] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    if (isOpen && imageName) {
      const fetchImage = async () => {
        setLoadingImage(true);
        try {
          const baseURL = import.meta.env.VITE_BASE_URL;
          const response = await fetch(`${baseURL}/api/image?image=${imageName}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setImageBase64(data.image); // Assuming `data.image` contains the Base64 string
          } else {
            console.error('Error fetching image:', response.statusText);
            setImageBase64(null);
          }
        } catch (error) {
          console.error('Error fetching image:', error);
          setImageBase64(null);
        } finally {
          setLoadingImage(false);
        }
      };

      fetchImage();
    } else {
      setImageBase64(null);
    }
  }, [isOpen, imageName]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: (value: React.SetStateAction<string>) => void
  ) => {
    setFunction(e.target.value);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm Surcharge</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" justifyContent="center" mb={2}>
          {loadingImage ? (
            <CircularProgress />
          ) : imageBase64 ? (
            <img
              src={`data:image/jpeg;base64,${imageBase64}`}
              alt="Surcharge Evidence"
              style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
            />
          ) : (
            <p>No image available</p>
          )}
        </Box>
        <TextField
          label="New Surcharge Amount"
          type="number"
          value={newSurchargeAmount}
          onChange={(e) => handleInputChange(e, setNewSurchargeAmount)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="New Total Amount"
          type="number"
          value={newTotalAmount}
          onChange={(e) => handleInputChange(e, setNewTotalAmount)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Close
        </Button>
        <Button
          onClick={() => onConfirm(Number(newSurchargeAmount), Number(newTotalAmount), "CONFIRM")}
          color="primary"
          variant="contained"
        >
          Confirm Surcharge
        </Button>
        <Button
          onClick={() => onConfirm(Number(newSurchargeAmount), Number(newTotalAmount), "REJECT")}
          color="secondary"
          variant="contained"
        >
          Reject Surcharge
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
