export interface IAddresses {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface ICustomer {
  addresses: IAddresses[];
  authenticationMode: string;
  billingAddressIds: [];
  createdAt: string;
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  dateOfBirth: string;
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: false;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  lastName: string;
  password: string;
  shippingAddressIds: [];
  stores: [];
  version: number;
  versionModifiedAt: string;
}

export interface ICustomerData {
  result: ICustomer;
  status: boolean;
  error: string | null;
}

export interface ICustomerState {
  customerData: ICustomerData;
}

export interface IPersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
}

export interface IAddressInfo {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

export interface IPassword {
  id: string;
  version: number;
  currentPassword: string;
  newPassword: string;
}
