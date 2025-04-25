import { useEffect, useState } from "react";
import { EntryCard } from "@/components/phonebook/EntryCard";
import { AddEntry } from "@/components/phonebook/AddEntry";
import { fetchEntries, addEntry, editEntry, deleteEntry } from "@/services/phonebookService";

export function PhonebookPage() {
  const [entries, setEntries] = useState<{
      email: any; id: string; name: string; phone: string 
}[]>([]);

  useEffect(() => {
    async function loadEntries() {
      const data = await fetchEntries();
      setEntries(data);
    }
    loadEntries();
  }, []);

  const handleAddEntry = async (name: string, phone: string, email: string) => {
    const newEntry = await addEntry(name, phone, email);
    setEntries((prev) => [...prev, newEntry]);
  };

  const handleEditEntry = async (id: string, name: string, phone: string, email: string) => {
    const updatedEntry = await editEntry(name, phone, email);
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? updatedEntry : entry))
    );
  };

  const handleDeleteEntry = async (id: string) => {
    await deleteEntry(id);
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="container mx-auto p-4" style={{ backgroundColor: "var(--color-primary-foreground)" }}>
      <div className="fixed top-0 left-0 w-full flex justify-between pl-5 pr-3 items-center backdrop-blur-md" style={{ backgroundColor: "rgba(var(--sidebar-primary), 0.5)" }}>
        <h1 className="text-2xl text-center font-bold mb-1">My Phonebook</h1>
        <AddEntry onAdd={handleAddEntry} />
      </div>
      <div className="flex gap-8 justify-center-safe flex-wrap scroll-mt-5 mt-12">
        {entries.map((entry) => (
          <EntryCard
            key={entry.id}
            name={entry.name}
            phone={entry.phone}
            email={entry.email}
            onEdit={(name, phone) => handleEditEntry(entry.id, name, phone, entry.email)}
            onDelete={() => handleDeleteEntry(entry.id)}
          />
        ))}
      </div>
    </div>
  );
}