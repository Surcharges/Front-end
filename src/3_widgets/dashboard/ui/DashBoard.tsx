import { useEffect, useState } from "react";
import { NavigationBar } from "./components/NavigationBar";
import { useAuth } from "@shared/model";
import Search from "./components/Search";
import SurhcargesList from "./components/SurchargesList"
import { Surcharge } from "./model/surcharge/Surcharge"
import { Box } from '@mui/material';

export function DashBoard() {
  const { user } = useAuth();
  const [surcharges, setSurcharges] = useState<Surcharge[]>([]);
  const [searchedSurcharges, setSearchedSurcharges] = useState<Surcharge[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorProp, setError] = useState<string | null>(null);

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

  return (
    <div className="h-screen flex flex-col">
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <NavigationBar />
      <Search onSearch={handleSearchChange} />
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <div className="m-4 text-center">
          <h2 className="text-lg font-bold mb-4">Reported Surcharges:</h2>
        </div>
      </Box>
    </nav>
    <div className="flex flex-col flex-grow mt-[65px] overflow-y-auto">
      <SurhcargesList searchedSurcharges={searchedSurcharges} loading={loading} errorProp={errorProp}/>
    </div>  
  </div>  
  );
}
