'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface SessionManagerProps {
  children: React.ReactNode;
}

export const SessionManager: React.FC<SessionManagerProps> = ({ children }) => {
  const { token, isAuthenticated, refreshToken, logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const checkTokenExpiry = () => {
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = tokenPayload.exp - currentTime;
        
        // Show warning if token expires within 5 minutes
        if (timeUntilExpiry < 300 && timeUntilExpiry > 0) {
          setShowWarning(true);
          setTimeLeft(timeUntilExpiry);
        } else if (timeUntilExpiry <= 0) {
          // Token has expired, logout
          logout();
        } else {
          setShowWarning(false);
        }
      } catch (error) {
        console.error('Error checking token expiry:', error);
      }
    };

    // Check immediately
    checkTokenExpiry();

    // Check every minute
    const interval = setInterval(checkTokenExpiry, 60000);

    return () => clearInterval(interval);
  }, [token, isAuthenticated, logout]);

  const handleRefreshToken = async () => {
    setIsRefreshing(true);
    try {
      await refreshToken();
      setShowWarning(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowWarning(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      
      {/* Session Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-orange-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Phiên đăng nhập sắp hết hạn
              </h3>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                Phiên đăng nhập của bạn sẽ hết hạn trong:
              </p>
              <div className="flex items-center text-2xl font-bold text-orange-600">
                <Clock className="h-6 w-6 mr-2" />
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleRefreshToken}
                disabled={isRefreshing}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isRefreshing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang gia hạn...
                  </div>
                ) : (
                  'Gia hạn phiên'
                )}
              </Button>
              
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex-1"
              >
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>Phiên đăng nhập đã được gia hạn thành công!</span>
        </div>
      )}
    </>
  );
};
