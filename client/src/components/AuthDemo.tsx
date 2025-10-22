'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, User, Shield, RefreshCw } from 'lucide-react';

export const AuthDemo: React.FC = () => {
  const { user, token, isAuthenticated, rememberMe, logout, refreshToken } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshToken = async () => {
    setIsRefreshing(true);
    try {
      await refreshToken();
      alert('Token đã được refresh thành công!');
    } catch (error) {
      alert('Lỗi khi refresh token: ' + (error as Error).message);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getTokenInfo = () => {
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = payload.exp - currentTime;
      
      return {
        issuedAt: new Date(payload.iat * 1000).toLocaleString(),
        expiresAt: new Date(payload.exp * 1000).toLocaleString(),
        timeUntilExpiry: timeUntilExpiry,
        userId: payload.userId,
        email: payload.email,
        role: payload.role
      };
    } catch (error) {
      return null;
    }
  };

  const tokenInfo = getTokenInfo();

  if (!isAuthenticated) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Trạng thái xác thực
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Bạn chưa đăng nhập</p>
          <Button 
            onClick={() => window.location.href = '/login'}
            className="mt-4 w-full"
          >
            Đăng nhập
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* User Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Thông tin người dùng
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Tên:</span>
            <span>{user?.firstName} {user?.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Vai trò:</span>
            <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}>
              {user?.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Ghi nhớ đăng nhập:</span>
            <Badge variant={rememberMe ? 'default' : 'outline'}>
              {rememberMe ? 'Có' : 'Không'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Token Info Card */}
      {tokenInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Thông tin Token
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Thời gian tạo:</span>
              <span className="text-sm">{tokenInfo.issuedAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Thời gian hết hạn:</span>
              <span className="text-sm">{tokenInfo.expiresAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Thời gian còn lại:</span>
              <Badge 
                variant={tokenInfo.timeUntilExpiry < 3600 ? 'destructive' : 'default'}
              >
                {Math.floor(tokenInfo.timeUntilExpiry / 3600)}h {Math.floor((tokenInfo.timeUntilExpiry % 3600) / 60)}m
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">User ID:</span>
              <span className="text-sm font-mono">{tokenInfo.userId}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Hành động</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            onClick={handleRefreshToken}
            disabled={isRefreshing}
            className="w-full"
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Đang refresh...' : 'Refresh Token'}
          </Button>
          
          <Button 
            onClick={logout}
            variant="destructive"
            className="w-full"
          >
            Đăng xuất
          </Button>
        </CardContent>
      </Card>

      {/* Session Status */}
      <Card>
        <CardHeader>
          <CardTitle>Trạng thái Session</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Trạng thái:</span>
              <Badge variant="default" className="bg-green-500">
                Đang hoạt động
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Auto-refresh:</span>
              <Badge variant={rememberMe ? 'default' : 'outline'}>
                {rememberMe ? 'Bật' : 'Tắt'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Session warning:</span>
              <Badge variant="default" className="bg-blue-500">
                Bật
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
