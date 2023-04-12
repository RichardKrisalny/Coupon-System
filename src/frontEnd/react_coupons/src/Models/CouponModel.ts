class CouponModel {
    public id:number;
    public companyID:number;
    public category:Category;
    public title: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public amount: number;
    public price: number;
    public image: string;
    

  }
  export enum Category {
    SPORT,ELECTRICITY,CLOTHING,CAMPING
  }
  export default CouponModel;