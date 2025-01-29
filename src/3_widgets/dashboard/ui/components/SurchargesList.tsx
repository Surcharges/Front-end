import React from "react";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { useAuth } from "@shared/model";
import { Surcharge } from "../model/surcharge/Surcharge"
import { Box } from '@mui/material';

interface SurhcargeListProps {
  searchedSurcharges: Surcharge[];
	loading: boolean;
	errorProp: string | null ;
}

const SurhcargesList: React.FC<SurhcargeListProps> = ({ searchedSurcharges, loading }) => {
	const { user } = useAuth();
	const [errorProp] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
	const [selectedSurcharge, setSelectedSurcharge] = useState<Surcharge | null>(
			null
		);

	const openConfirmationModal = (surcharge: Surcharge) => {
		setSelectedSurcharge(surcharge);
		setConfirmationModalOpen(true);
	};

	const closeConfirmationModal = () => {
		setConfirmationModalOpen(false);
		setSelectedSurcharge(null);
	};

	const confirmSurcharge = async (
		id: string,
		action: string,
		surchargeAmount?: number,
		totalAmount?: number
	) => {
		try {
			const baseURL = import.meta.env.VITE_BASE_URL;
			const token = user ? await user.getIdToken() : "";

			const response = await fetch(`${baseURL}/admin/surcharge`, {
				body: JSON.stringify({
					id,
					surchargeAmount,
					totalAmount,
					action,
				}),
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error confirming surcharge: ${response.statusText}`);
			}

			// // Reload data after successful confirmation
			// setSurcharges((prev) =>
			//   prev.map((surcharge) =>
			//     surcharge.id === id
			//       ? { ...surcharge, surchargeStatus: action }
			//       : surcharge
			//   )
			// );
			// setSearchedSurcharges((prev) =>
			//   prev.map((surcharge) =>
			//     surcharge.id === id
			//       ? { ...surcharge, surchargeStatus: action }
			//       : surcharge
			//   )
			// );
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "An unknown error occurred while confirming surcharge"
			);
		} finally {
			closeConfirmationModal();
		}
		window.location.reload()
	};	

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
        <Box
          sx={{
            width: '90%',
            maxWidth: '800px',
            overflowY: 'auto',
            height: '90vh',
            bgcolor: 'background.paper',
          }}
        >
          <div className="mt-4">
        {loading ? (
          <p>Loading surcharges...</p>
        ) : error || errorProp ? (
          <p className="text-red-500">Error: {error || errorProp}</p>
        ) : (
          <div>
            <h2 className="text-lg font-bold mb-4">Surcharges:</h2>
            {searchedSurcharges.length === 0 ? (
              <p>No surcharge records match the selected filter.</p>
            ) : (
              <ul className="list-disc pl-6">
                {searchedSurcharges.map((surcharge) => (
                  <li key={surcharge.id} className="mb-4">
                    <div>
                      <p>
                        <strong>Title:</strong> {surcharge.displayName}
                      </p>
                      <p>
                        <strong>Address:</strong> {surcharge.addressComponents}
                      </p>
                      <p>
                        <strong>Surcharge Rate:</strong> {surcharge.rate}
                      </p>
                      <p>
                        <strong>Reported Date:</strong>{" "}
                        {new Date(
                          surcharge.reportedDate
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Surcharge Amount:</strong> $
                        {surcharge.surchargeAmount}
                      </p>
                      <p>
                        <strong>Total Amount:</strong> ${surcharge.totalAmount}
                      </p>
                      <p>
                        <strong>Status:</strong>{' '}
                          <span
                            style={{
                              color:
                                surcharge.surchargeStatus === 'CONFIRMED'
                                  ? 'lightgreen'
                                : surcharge.surchargeStatus === 'REPORTED'
                                  ? 'gray'
                                : surcharge.surchargeStatus === 'REJECTED'
                                  ? 'red'  
                                  : 'yellow',
                            }}
                          >
                          {surcharge.surchargeStatus}
                        </span>
                      </p>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => openConfirmationModal(surcharge)}
                      >
                        Process surcharge
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      {selectedSurcharge && (
        <ConfirmationModal
          status={selectedSurcharge.surchargeStatus}
          surchargeId={selectedSurcharge.id}
          imageName={selectedSurcharge.image}
          isOpen={confirmationModalOpen}
          onClose={closeConfirmationModal}
          onConfirm={confirmSurcharge}
        />
      )}
    </Box>
  </Box>
  );
};

export default SurhcargesList;