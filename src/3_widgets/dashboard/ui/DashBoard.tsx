import React, { useEffect, useState } from 'react';
import { NavigationBar } from './components/NavigationBar';

// Define the surcharge type
interface Surcharge {
  image: string;
  placeInformation: string;
  rate: number;
  reportedDate: number; // Assuming this is a timestamp in milliseconds
  totalAmount: number;
  surchargeAmount: number;
  surchargeStatus: string;
}

export function DashBoard() {
  const [surcharges, setSurcharges] = useState<Surcharge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurcharges = async () => {
      try {
        const host = process.env.REACT_APP_API_HOST;
        const response = await fetch(`${host}/admin/surcharges`);

        if (!response.ok) {
          throw new Error(`Error fetching surcharges: ${response.statusText}`);
        }

        const allSurcharges = await response.json();
        const formattedSurcharges: Surcharge[] = allSurcharges.map((surcharge: any) => ({
          image: surcharge.image,
          placeInformation: surcharge.placeInformation,
          rate: surcharge.rate,
          reportedDate: surcharge.reportedDate.toMillis(),
          totalAmount: surcharge.totalAmount,
          surchargeAmount: surcharge.surchargeAmount,
          surchargeStatus: surcharge.surchargeStatus,
        }));

        setSurcharges(formattedSurcharges);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSurcharges();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <NavigationBar />
      </div>
      <div className="mt-4">
        {loading ? (
          <p>Loading surcharges...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : surcharges.length === 0 ? (
          <p>No surcharge records are available yet.</p>
        ) : (
          <div>
            <h2 className="text-lg font-bold">Surcharges</h2>
            <ul className="list-disc pl-6">
              {surcharges.map((surcharge, index) => (
                <li key={index} className="mb-4">
                  <div>
                    <img
                      src={surcharge.image}
                      alt="Surcharge"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                  <div>
                    <p>
                      <strong>Place Information:</strong> {surcharge.placeInformation}
                    </p>
                    <p>
                      <strong>Rate:</strong> {surcharge.rate}
                    </p>
                    <p>
                      <strong>Reported Date:</strong>{' '}
                      {new Date(surcharge.reportedDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> ${surcharge.totalAmount}
                    </p>
                    <p>
                      <strong>Surcharge Amount:</strong> ${surcharge.surchargeAmount}
                    </p>
                    <p>
                      <strong>Status:</strong> {surcharge.surchargeStatus}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
