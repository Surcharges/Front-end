import { useEffect, useState } from "react";
import { NavigationBar } from "./components/NavigationBar";
import { useAuth } from "@shared/model";
import Search from "./components/Search";
import ConfirmationModal from "./components/ConfirmationModal";
import { Box } from '@mui/material';

interface Surcharge {
  id: string;
  image: string;
  placeInformation?: string; // Optional as it's not always set
  rate: number;
  reportedDate: number; // Assuming this is a timestamp in milliseconds
  totalAmount: number;
  surchargeAmount: number;
  surchargeStatus: string;
  displayName: string;
  addressComponents: string;
}

export function DashBoard() {
  const { user } = useAuth();
  const [surcharges, setSurcharges] = useState<Surcharge[]>([]);
  const [searchedSurcharges, setSearchedSurcharges] = useState<Surcharge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedSurcharge, setSelectedSurcharge] = useState<Surcharge | null>(
    null
  );

  useEffect(() => {
    const fetchSurcharges = async () => {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL;
        const token = user ? await user.getIdToken() : "";

        const response = await fetch(`${baseURL}/admin/places`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching surcharges: ${response.statusText}`);
        }

        const allPlaces = await response.json();
        const formattedSurcharges: Surcharge[] = allPlaces.places.map(
          (surcharge: any) => ({
            id: surcharge.id,
            image: surcharge.image,
            rate: surcharge.rate,
            reportedDate: surcharge.reportedDate._seconds * 1000,
            totalAmount: surcharge.totalAmount,
            surchargeAmount: surcharge.surchargeAmount,
            surchargeStatus: surcharge.surchargeStatus,
            displayName: surcharge.displayName.text,
            addressComponents: `${surcharge.addressComponents[0].shortText}/${surcharge.addressComponents[1].shortText} ${surcharge.addressComponents[2].shortText}`
          })
        );

        setSurcharges(formattedSurcharges);
        setSearchedSurcharges(formattedSurcharges);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching surcharges"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSurcharges();
  }, [user]);

  const handleSearchChange = (newFilter: string) => {
    const filterValue = newFilter.toLowerCase();
    const filteredSurcharges = surcharges.filter(
      (surcharge) =>
        surcharge.displayName.toLowerCase().includes(filterValue) ||
        surcharge.addressComponents.toLowerCase().includes(filterValue) ||
        surcharge.surchargeStatus.toLowerCase().includes(filterValue) ||
        surcharge.rate.toString() === filterValue ||
        surcharge.totalAmount.toString() === filterValue ||
        surcharge.surchargeAmount.toString() === filterValue
    );
    setSearchedSurcharges(filteredSurcharges);
  };

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
    <div className="h-screen flex flex-col">
    {/* Fixed Navbar */}
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <NavigationBar />
      <Search onSearch={handleSearchChange} />
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <div className="m-4 text-center">
          <h2 className="text-lg font-bold mb-4">Reported Surcharges:</h2>
        </div>
      </Box>
    </nav>

    {/* Scrollable List Container (Below Navbar) */}
    <div className="flex flex-col flex-grow mt-[65px] overflow-y-auto">
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <Box
          sx={{
            width: "90%",
            maxWidth: "500px",
            overflowY: "auto", // Scrolls only the list
            height: "90vh", // Ensures proper height
            bgcolor: "background.paper",
          }}
        >
          <div className="mt-4">
        {loading ? (
          <p>Loading surcharges...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div>
            {/* <h2 className="text-lg font-bold mb-4">Reported Surcharges:</h2> */}
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
    </div>  

  </div>  
  );
}
