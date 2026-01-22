import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { api } from '../lib/api';

interface Stats {
  total: number;
  verified: number;
  attended: number;
  pending: number;
  attendanceRate: number;
}

interface ScanResult {
  success: boolean;
  alreadyAttended: boolean;
  message: string;
  user: {
    fullName: string;
    registrationCode: string;
    email: string;
    phone?: string;
    branch?: string;
    yearOfStudy?: string;
    attendedAt?: string;
  };
}

interface RecentScan {
  id: string;
  scannedAt: string;
  user: {
    fullName: string;
    registrationCode: string;
    email: string;
    branch: string;
  };
  admin: {
    name: string;
  };
}

const Attendance: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentScans, setRecentScans] = useState<RecentScan[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string>('');
  const [manualInput, setManualInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchStats();
    fetchRecentScans();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/attendance/stats');
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const fetchRecentScans = async () => {
    try {
      const response = await api.get('/attendance/recent?limit=5');
      setRecentScans(response.data);
    } catch (err) {
      console.error('Failed to fetch recent scans:', err);
    }
  };

  const startScanning = async () => {
    try {
      setError('');
      setScanResult(null);
      
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        handleScan,
        () => {} // onScanFailure - ignore
      );

      setIsScanning(true);
    } catch (err) {
      setError(`Camera error: ${err instanceof Error ? err.message : 'Could not start camera'}`);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      } catch (err) {
        console.error('Failed to stop scanner:', err);
      }
    }
    setIsScanning(false);
  };

  const handleScan = async (decodedText: string) => {
    await stopScanning();
    await processQRCode(decodedText);
  };

  const processQRCode = async (qrData: string) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.post('/attendance/scan', { qrData });
      setScanResult(response.data);
      await fetchStats();
      await fetchRecentScans();

      setTimeout(() => setScanResult(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process QR code');
    } finally {
      setLoading(false);
    }
  };

  const handleManualCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;

    try {
      setLoading(true);
      setError('');
      setScanResult(null);

      const payload: { email?: string; registrationCode?: string; phone?: string } = {};

      if (manualInput.includes('@')) {
        payload.email = manualInput;
      } else if (manualInput.startsWith('IC2K26-')) {
        payload.registrationCode = manualInput;
      } else if (/^\d{10}$/.test(manualInput)) {
        payload.phone = manualInput;
      } else {
        setError('Invalid input. Enter registration code, email, or 10-digit phone');
        return;
      }

      const response = await api.post('/attendance/manual', payload);
      setScanResult(response.data);
      setManualInput('');
      await fetchStats();
      await fetchRecentScans();

      setTimeout(() => setScanResult(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Manual check-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Event Attendance
        </h1>
        <Link
          to="/admin/attendance-list"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          📋 View Full List
        </Link>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-600 dark:text-blue-300">Total Verified</h3>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-200">{stats.verified}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-600 dark:text-green-300">Attended</h3>
            <p className="text-2xl font-bold text-green-700 dark:text-green-200">{stats.attended}</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-300">Pending</h3>
            <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-200">{stats.pending}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-600 dark:text-purple-300">Attendance Rate</h3>
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-200">{stats.attendanceRate}%</p>
          </div>
        </div>
      )}

      {/* QR Scanner & Manual Entry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* QR Scanner */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">QR Scanner</h2>
          
          {!isScanning ? (
            <button
              onClick={startScanning}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Start Scanning
            </button>
          ) : (
            <>
              <div id="qr-reader" ref={scannerContainerRef} className="mb-4 rounded-lg overflow-hidden"></div>
              <button
                onClick={stopScanning}
                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Stop Scanning
              </button>
            </>
          )}
        </div>

        {/* Manual Entry */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Manual Check-In</h2>
          <form onSubmit={handleManualCheckIn}>
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Registration Code / Email / Phone"
              className="w-full px-4 py-2 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Manual Check-In'}
            </button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Enter IC2K26-XXXXX, email, or 10-digit phone number
          </p>
        </div>
      </div>

      {/* Scan Result */}
      {scanResult && (
        <div className={`p-4 rounded-lg mb-6 ${scanResult.success && !scanResult.alreadyAttended ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'}`}>
          <h3 className={`font-bold text-lg mb-2 ${scanResult.success && !scanResult.alreadyAttended ? 'text-green-800 dark:text-green-200' : 'text-yellow-800 dark:text-yellow-200'}`}>
            {scanResult.message}
          </h3>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p><strong>Name:</strong> {scanResult.user.fullName}</p>
            <p><strong>Code:</strong> {scanResult.user.registrationCode}</p>
            <p><strong>Email:</strong> {scanResult.user.email}</p>
            {scanResult.user.attendedAt && (
              <p><strong>Time:</strong> {new Date(scanResult.user.attendedAt).toLocaleString()}</p>
            )}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Recent Scans */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Check-Ins</h2>
        {recentScans.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No check-ins yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Time</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Code</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Branch</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentScans.map((scan) => (
                  <tr key={scan.id}>
                    <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                      {new Date(scan.scannedAt).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{scan.user.fullName}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{scan.user.registrationCode}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{scan.user.branch}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{scan.admin.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
