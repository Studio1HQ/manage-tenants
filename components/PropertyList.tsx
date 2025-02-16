import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card';
import { properties } from '../properties';

const PropertyList = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 max-w-7xl mx-auto">
      {properties.map((property) => (
        <Card key={property.propertyKey} className="mb-4">
          <CardHeader>
            <CardTitle>{property.propertyName}</CardTitle>
            <CardDescription>
              Move-out Date: {property.moveOutDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <strong>Tenant:</strong> {property.tenant.name} (
              {property.tenant.email})
            </div>
            <div>
              <strong>Co-Signer:</strong> {property.coSigner.name} (
              {property.coSigner.email})
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PropertyList;
