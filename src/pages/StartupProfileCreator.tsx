
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StartupProfileCreator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Startup Profile Creator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Startup profile creation functionality will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StartupProfileCreator;
