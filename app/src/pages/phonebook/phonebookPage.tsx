import { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { EntryCard } from "@/components/phonebook/EntryCard";
import { AddEntry } from "@/components/phonebook/AddEntry";
import { fetchEntries, addEntry, editEntry, deleteEntry } from "@/services/phonebookService";
import { Input } from "@/components/ui/input";
import { Terminal } from "lucide-react";

export function PhonebookPage() {
  const [entries, setEntries] = useState<{
    id: string;
    name: string;
    phone: string;
    email: string;
  }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    async function loadEntries() {
      try {
        const data = await fetchEntries();
        const flatData = Object.values(data).flat() as {
          id: string;
          name: string;
          phone: string;
          email: string;
        }[];
        setEntries(flatData);
      } catch (err) {
        handleError("Failed to load entries.");
      }
    }
    loadEntries();
  }, []);

  const handleError = (message: string) => {
    setError(message);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
      setTimeout(() => {
        setError(null);
      }, 500);
    }, 4000);
  };

  const handleAddEntry = async (name: string, phone: string, email: string) => {
    if (!name || !phone || !email) {
      handleError("All fields are required.");
      return;
    }
    if (!/^\+\d{11}$/.test(phone)) {
      handleError("Phone number must be written in the format +XXXXXXXXXXX");
      return;
    }
    try {
      const newEntry = await addEntry(name, phone, email);
      setEntries((prev) => [...prev, newEntry]);
    } catch (err) {
      handleError("Failed to add entry.");
    }
  };

  const handleEditEntry = async (id: string, name: string, phone: string, email: string) => {
    if (!name || !phone || !email) {
      handleError("All fields are required.");
      return;
    }
    if (!/^\+\d{11}$/.test(phone)) {
      handleError("Phone number must be written in the format +XXXXXXXXXXX");
      return;
    }
    try {
      const updatedEntry = await editEntry(id, name, phone, email);
      setEntries((prev) =>
        prev.map((entry) => (entry.id === id ? updatedEntry : entry))
      );
    } catch (err) {
      handleError("Failed to edit entry.");
    }
  };

  const handleDeleteEntry = async (id: string) => {
    try {
      await deleteEntry(id);
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    } catch (err) {
      handleError("Failed to delete entry.");
    }
  };

  const filteredEntries = entries.filter((entry) =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.phone.includes(searchQuery) ||
    entry.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-screen bg-primary-foreground fixed top-0 left-0 p-4">
      <div className="fixed top-0 left-0 w-full flex justify-between pl-5 pr-3 items-center backdrop-blur-md bg-primary/50">
        <h1 className="text-2xl text-center mb-1">My Phonebook</h1>
        <AddEntry onAdd={handleAddEntry} />
      </div>
      <div className="mt-16 mb-4">
        <Input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md mx-auto"
        />
      </div>
      {error && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg transition-opacity duration-500 ${showError ? "opacity-100" : "opacity-0"}`}>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
      {filteredEntries.length === 0 ? (
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-gray-500 text-xl">No matching entries found.</p>
          </div>
        ) : (
          <div className="flex gap-8 justify-center-safe flex-wrap scroll-mt-5 mt-12">
          {
          filteredEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              name={entry.name}
              phone={entry.phone}
              email={entry.email}
              onEdit={(name, phone, email) => handleEditEntry(entry.id, name, phone, email)}
              onDelete={() => handleDeleteEntry(entry.id)}
            />
          ))}
        </div>)
        }
    </div>
  );
}