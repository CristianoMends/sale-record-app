import SaleItem from "./SaleItem";

export default interface CreateSale{
    saleItems: SaleItem[];
    paymentMethod:string;
}