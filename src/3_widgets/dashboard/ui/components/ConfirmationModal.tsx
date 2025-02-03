import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Box } from '@mui/material';
import { useAuth } from "@shared/model";

interface Props {
  totalAmount: number
  surchargeAmount: number
  status: string
  surchargeId: string;
  imageName: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (surchargeId: string, action: string, newSurchargeAmount: number | undefined, newTotalAmount: number | undefined) => Promise<void>;
}

const ConfirmationModal: React.FC<Props> = ({totalAmount, surchargeAmount, status, surchargeId, imageName, isOpen, onClose, onConfirm }) => {
  const [newSurchargeAmount, setNewSurchargeAmount] = useState('');
  const [newTotalAmount, setNewTotalAmount] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [isTotalBiggerThatnSurcharge, setIsTotalBiggerThatnSurcharge] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && imageName) {
      const fetchImage = async () => {
        setLoadingImage(true);
        try {
          const baseURL = import.meta.env.VITE_BASE_URL;
          const token = user ? await user.getIdToken() : "";

          const response = await fetch(`${baseURL}/admin/image?image=${imageName}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setImageBase64(data.image); 
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
  }, [user, isOpen, imageName]);

  const checkIfTotalBiggerThenSurcharge = (
    newTotalAmount: string, newSurchargeAmount: string  ) => {
    if(Number(newTotalAmount) < Number(newSurchargeAmount)){setIsTotalBiggerThatnSurcharge(false)}
    else {setIsTotalBiggerThatnSurcharge(true)}
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: (value: React.SetStateAction<string>) => void,
  ) => {
    setFunction(e.target.value);
    checkIfTotalBiggerThenSurcharge(newTotalAmount, newSurchargeAmount)
  };

  function renderContent() {
    if (isTotalBiggerThatnSurcharge){
      if (status === "REPORTED") {
        return (
          <>
            <Button
              onClick={() =>
                onConfirm(surchargeId, "CONFIRM", Number(newSurchargeAmount), Number(newTotalAmount))
              }
              color="success"
              variant="contained"
            >
              Confirm Surcharge
            </Button>
            <Button
              onClick={() =>
                onConfirm(surchargeId, "REJECT", Number(newSurchargeAmount), Number(newTotalAmount))
              }
              color="error"
              variant="contained"
            >
              Reject Surcharge
            </Button>
          </>
        );
      } else if (status === "CONFIRMED") {
        return (
          <Button
            onClick={() =>
              onConfirm(surchargeId, "REJECT", Number(newSurchargeAmount), Number(newTotalAmount))
            }
            color="error"
            variant="contained"
          >
            Reject Surcharge
          </Button>
        );
      } else if (status === "REJECTED") {
        return (
          <Button
            onClick={() =>
              onConfirm(surchargeId, "CONFIRM", Number(newSurchargeAmount), Number(newTotalAmount))
            }
            color="success"
            variant="contained"
          >
            Confirm Surcharge
          </Button>
        );
      }
    } else {
      return (
        <Box component="span"
        sx={{
          backgroundColor: 'red',
          color: 'white', // Text color for contrast
          padding: '4px 8px', // Padding for the badge
          borderRadius: '8px', // Rounded corners
          fontWeight: 'bold',
          display: 'inline-block', // Keeps the box inline
        }}>Probably a mistake, "newSurchargeAmount" value is bigger that "newTotalAmount", please correct </Box>
      )
    }
    
  }
  

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
          label="New Total Amount"
          placeholder={totalAmount.toString()}
          type="number"
          value={newTotalAmount}
          onChange={(e) => handleInputChange(e, setNewTotalAmount)}
          fullWidth
          variant="outlined"
          margin="normal"
          slotProps={{
            inputLabel: { shrink: true }
          }}
        />
        <TextField
          label="New Surcharge Amount"
          placeholder={surchargeAmount.toString()}
          type="number"
          value={newSurchargeAmount}
          onChange={(e) => handleInputChange(e, setNewSurchargeAmount)}
          fullWidth
          variant="outlined"
          margin="normal"
          slotProps={{
            inputLabel: { shrink: true }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Close
        </Button>
        {renderContent()}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
