export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string
}

export enum ProductKeys {
  ID= 'id',
  NAME='name',
  DESCRIPTION = 'description',
  LOGO = 'logo',
  DATE_RELEASE = 'date_release',
  DATE_REVISION = 'date_revision',
}
