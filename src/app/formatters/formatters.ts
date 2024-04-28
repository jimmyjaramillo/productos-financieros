import { Product } from "../interfaces/product";

export const formatProducts = (response: any[]): Product [] => {

  return response.map(product => {
    const {id,name,description,logo,date_release,date_revision } = product ?? {};
    return {
      id,
      name,
      description,
      logo,
      date_release,
      date_revision
    }
  }) || [];
}
