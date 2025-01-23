import React from "react";

interface SearchProps {
  onSearch: (filter: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter to search surcharges"
        value={searchTerm}
        onChange={handleSearchChange}
        className="px-4 py-2 mb-2 border rounded"
      />
    </form>
  );
};

export default Search;