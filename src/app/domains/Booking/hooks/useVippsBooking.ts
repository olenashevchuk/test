import { PENDING_STATUS } from '../__constants__/bookingStatuses';
import { createBooking } from '../helpers';
import { useMemo } from 'react';
import { useWidget } from '../../../contexts/Widget';

// Vipps login part variables
const VIPPS_URL = 'https://api.vipps.no';
const clientId = 'ce5bbcdd-1f17-45f2-928e-90f928faff9d';
const APP_URL = 'https://client.dent-in.no';
const VIPPS_AUTH_ENDPOINT = '/access-management-1.0/access/oauth2/auth';
const VIPPS_CALLBACK_PATH = '/auth/vipps-callback';

interface IVippsBookingHookProps {
    setVippsLoading: (isLoading:boolean) => void,
    setVippsBookingFailure: (failureType:string) => void
}

const useVippsAuthMethod = (vippsBooking: IVippsBookingHookProps) => {
  const { setVippsLoading, setVippsBookingFailure } = vippsBooking;
  const { currentTimeslot, currentTreatment } = useWidget();

  // Convert array of selected addons objects to array of addons ids
  const arrayOfSelectedTreatmentAddonsIds = useMemo(() => (currentTreatment?.selectedAddons?.length
    ? currentTreatment?.selectedAddons?.map((addon:any) => addon?._id) : []), [currentTreatment]);

  const handleBookingWithVipps = async () => {
    setVippsLoading?.(true);

    // Create object to save appointment data
    // after successful user auth with Vipps will be updated with user data
    const pendingBookingData = {
      price: currentTreatment?.price,
      status: PENDING_STATUS,
      timeslot: {
        start: currentTimeslot?.startStringDate,
        end: currentTimeslot?.endStringDate,
        clinicId: currentTimeslot?.clinic?._id,
        clinicianId: currentTimeslot?.clinician?._id,
        treatmentId: +currentTimeslot.treatmentId,
        addons: arrayOfSelectedTreatmentAddonsIds,
      },
    };

    const bookingResponseData = await createBooking({
      pendingBookingData, onBookingFailure: setVippsBookingFailure,
    });

    if (bookingResponseData?.data?.booking?._id) {
      const url:any = new URL(VIPPS_URL + VIPPS_AUTH_ENDPOINT);
      const params:any = {
        response_type: 'code',
        client_id: clientId,
        redirect_uri: APP_URL + VIPPS_CALLBACK_PATH,
        scope: 'openid email phoneNumber name api_version_2 address nin',
        state: bookingResponseData.data.booking._id,
      };

      url.search = new URLSearchParams(params).toString();
      window.location.href = url;
    } else {
      setVippsLoading?.(false);
    }
  };

  return handleBookingWithVipps;
};

export default useVippsAuthMethod;
