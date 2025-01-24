import { useEffect, useState } from 'react';
import { NavigationBar } from './components/NavigationBar';
import { useAuth } from '@shared/model';
import Search from "./components/Search";
import ConfirmationModal from './components/ConfirmationModal';

// Define the surcharge type
interface Surcharge {
  id: string,
  image: string;
  placeInformation: string;
  rate: number;
  reportedDate: number; // Assuming this is a timestamp in milliseconds
  totalAmount: number;
  surchargeAmount: number;
  surchargeStatus: string;
}

// interface Place

export function DashBoard() {
  const {user} = useAuth();
  const [surcharges, setSurcharges] = useState<Surcharge[]>([]);
  const [searchedSurcharges, setSearchedSurcharges] = useState<Surcharge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [imageName, setImageName] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchSurcharges = async () => {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL;
        const token = user ? await user.getIdToken() : ''; // Resolve the token to a string
        
        const response = await fetch(`${baseURL}/api/surcharges`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching surcharges: ${response.statusText}`);
        }

        const allSurcharges = await response.json();
        const formattedSurcharges: Surcharge[] = allSurcharges.map((surcharge: any) => ({
          id: surcharge.id,
          image: surcharge.image,
          // getPlace: getPlace(surcharge.id).displayName.name,
          rate: surcharge.rate,
          reportedDate: surcharge.reportedDate,
          totalAmount: surcharge.totalAmount,
          surchargeAmount: surcharge.surchargeAmount,
          surchargeStatus: surcharge.surchargeStatus,
        }));

        setSurcharges(formattedSurcharges);

        setSearchedSurcharges(
          formattedSurcharges
        )
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred fetching surcharges');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSurcharges();
  }, []);
  
  const handleSearchChange = (newFilter: string) => {
    surcharges.forEach(surcharge => {
      if (surcharge.rate === Number(newFilter)) {
        setSearchedSurcharges(surcharges.filter((surcharge) => surcharge.rate === Number(newFilter)));
      } else if (surcharge.surchargeAmount === Number(newFilter)){
        setSearchedSurcharges(surcharges.filter((surcharge) => surcharge.surchargeAmount === Number(newFilter)));
      } else if (surcharge.totalAmount === Number(newFilter)){
        setSearchedSurcharges(surcharges.filter((surcharge) => surcharge.totalAmount === Number(newFilter)));
      } else if (surcharge.surchargeStatus === newFilter){
        setSearchedSurcharges(surcharges.filter((surcharge) => surcharge.surchargeStatus === newFilter));
      } else if (surcharge.id === newFilter){
        setSearchedSurcharges(surcharges.filter((surcharge) => surcharge.id === newFilter));
      } 
    });
  };

  function openConfirmationModal(id: string, surchargeAmount?: number, totalAmount?: number, imageName?: string) {
    setConfirmationModalOpen(true);
    setImageName(imageName)
  }

  function closeConfirmationModal() {
    setConfirmationModalOpen(false);
  }

  const confirmSurcharge = async (id: string, surchargeAmount?: number, totalAmount?: number) => {
    console.log(id, surchargeAmount, totalAmount)
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const token = user ? await user.getIdToken() : ''; // Resolve the token to a string
      
      const response = await fetch(`${baseURL}/api/surcharge`, {
        body: JSON.stringify({
          id: id,
          surchargeAmount: surchargeAmount,
          totalAmount: totalAmount,
        }),
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error confirming surcharge: ${response.statusText}`);
      }
      window.location.reload();

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred confirming surcharge');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <NavigationBar />
      </div>
      <div className="flex flex-col items-center">
        <Search onSearch={handleSearchChange} />
      </div>
      <div className="mt-4">
        {loading ? (
          <p>Loading surcharges...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold">Surcharges: </h2>
              
            </div>
            {searchedSurcharges.length === 0 ? (
              <p>No surcharge records match the selected filter.</p>
            ) : (
              <ul className="list-disc pl-6">
                {searchedSurcharges.map((surcharge, index) => (
                  <li key={index} className="mb-4">
                    <div>
                      <p>
                        <strong>ID:</strong> {surcharge.id}
                      </p>
                      <p>
                        <strong>Rate:</strong> {surcharge.rate}
                      </p>
                      <p>
                        <strong>Reported Date:</strong>{' '}
                        {new Date(surcharge.reportedDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Surcharge Amount:</strong> ${surcharge.surchargeAmount}
                      </p>
                      <p>
                        <strong>Total Amount:</strong> ${surcharge.totalAmount}
                      </p>
                      <p>
                        <strong>Status:</strong> {surcharge.surchargeStatus}
                      </p>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => openConfirmationModal(surcharge.id, surcharge.surchargeAmount, surcharge.totalAmount, surcharge.image)}>
                        Process surcharge
                      </button>
                      {confirmationModalOpen && (
                        <ConfirmationModal
                        imageName={imageName}
                        isOpen={confirmationModalOpen}
                        onClose={closeConfirmationModal}
                        onConfirm={(newSurchargeAmount: number | undefined, newTotalAmount: number | undefined) =>
                        confirmSurcharge(surcharge.id, newSurchargeAmount, newTotalAmount)}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
