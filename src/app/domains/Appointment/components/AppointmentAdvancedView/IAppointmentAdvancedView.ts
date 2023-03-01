interface IAppointmentAdvancedView {
  treatment?: string,
  monthName: string,
  price?:string,
  day:string,
  date:number,
  start:string,
  end:string,
  address:string,
  clinicianAvatar:string,
  clinicianName:string,
  setVippsLoading?:any,
  setVippsBookingFailure?:any,
}

export default IAppointmentAdvancedView;
