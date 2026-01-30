import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminApi } from "../api/admin";
import type { OutboxEntry, SendResult } from "../api/admin";
import { Loader2 } from "lucide-react";

type OutboxStatus = 'PENDING' | 'PROCESSING' | 'DONE' | 'FAILED' | '';
const Outbox = () => {
  const [statusFilter, setStatusFilter] = useState<OutboxStatus>("PENDING");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { data: entries = [], isLoading, refetch } = useQuery<OutboxEntry[]>({
    queryKey: ["admin", "outbox", statusFilter],
    queryFn: () => adminApi.getOutbox(statusFilter === '' ? undefined : (statusFilter as Exclude<OutboxStatus, ''>)),
  });

  const sendMutation = useMutation<SendResult, Error, string[]>({
    mutationFn: async (outboxIds: string[]) => await adminApi.sendOutbox(outboxIds),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteMutation = useMutation<SendResult, Error, string[]>({
    mutationFn: async (outboxIds: string[]) => await adminApi.deleteOutbox(outboxIds),
    onSuccess: () => {
      refetch();
    },
  });


  const toggleSelection = (id: string) => {
    const s = new Set(selectedIds);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    setSelectedIds(s);
  };

  const selectAll = () => {
    if (selectedIds.size === entries.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(entries.map((e) => e.id)));
  };

  const handleSend = async () => {
    if (selectedIds.size === 0) {
      alert("Please select at least one entry");
      return;
    }

    if (!confirm(`Send ${selectedIds.size} email(s)?`)) return;

    try {
      await sendMutation.mutateAsync(Array.from(selectedIds));
      alert("Send request processed — check results on the list");
      setSelectedIds(new Set());
    } catch (err) {
      console.error(err);
      alert("Failed to send emails");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Outbox Management</h1>

      <div className="bg-card rounded-lg shadow p-4 mb-6">
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-2">
            <label className="font-medium">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OutboxStatus)}
              className="border rounded px-3 py-2"
            >
              <option value="">All</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="DONE">Done</option>
              <option value="FAILED">Failed</option>
              <option value="DELETED">Deleted</option>
            </select>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={selectAll}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
            >
              {selectedIds.size === entries.length ? "Deselect All" : "Select All"}
            </button>
            <button
              onClick={handleSend}
              disabled={sendMutation.status === 'pending' || selectedIds.size === 0}
              className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
            >
              {sendMutation.status === 'pending' ? "Sending..." : `Send Selected (${selectedIds.size})`}
            </button>
            <button
              onClick={async () => {
                if (selectedIds.size === 0) { alert('Please select at least one entry'); return; }
                if (!confirm(`Delete ${selectedIds.size} outbox entry(ies)? This is a soft-delete.`)) return;
                try {
                  await deleteMutation.mutateAsync(Array.from(selectedIds));
                  alert('Deletion completed');
                  setSelectedIds(new Set());
                } catch (err) {
                  console.error(err);
                  alert('Failed to delete entries');
                }
              }}
              disabled={deleteMutation.status === 'pending' || selectedIds.size === 0}
              className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-400"
            >
              {deleteMutation.status === 'pending' ? 'Deleting...' : `Delete Selected (${selectedIds.size})`}
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border text-foreground">
            <thead className="bg-muted/5">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === entries.length && entries.length > 0}
                    onChange={selectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Code</th>
                <th className="px-4 py-3 text-left">Attempts</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-left">Error</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-card divide-y divide-border text-foreground">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      Loading outbox...
                    </div>
                  </td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                    No entries found
                  </td>
                </tr>
              ) : (
                entries.map((entry: OutboxEntry) => (
                  <tr key={entry.id} className={`${selectedIds.has(entry.id) ? 'bg-primary/10' : ''}`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(entry.id)}
                        onChange={() => toggleSelection(entry.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">{entry.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">{entry.payload.fullName}</td>
                    <td className="px-4 py-3 text-sm">{entry.payload.email}</td>
                    <td className="px-4 py-3 text-sm font-mono">{entry.payload.registrationCode}</td>
                    <td className="px-4 py-3 text-sm">{entry.attempts}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(entry.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">
                      {entry.lastError && (<span className="text-red-600 dark:text-red-300 text-xs">⚠️ {entry.lastError.substring(0, 40)}...</span>)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={async () => {
                          if (!confirm('Delete this outbox entry? This will soft-delete the entry.')) return;
                          try {
                            await deleteMutation.mutateAsync([entry.id]);
                            alert('Deleted');
                          } catch (err) {
                            console.error(err);
                            alert('Failed to delete entry');
                          }
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">Total entries: {entries.length} | Selected: {selectedIds.size}</div>
    </div>
  );
};

export default Outbox;
