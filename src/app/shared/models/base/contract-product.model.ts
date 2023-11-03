import { ContractModel } from './contract.model';
import { ProductModel } from './product.model';

export interface ContractProduct {
  id: string;
  contractId: string;
  contract: ContractModel;
  productId: string;
  product: ProductModel;
  price: number;
}
