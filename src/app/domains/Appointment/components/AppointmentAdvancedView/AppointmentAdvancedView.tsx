import {
  Avatar,
  Button,
  CalendarItem,
  Divider,
  Text,
  Title,
} from '../../../../components';
import React, { useMemo } from 'react';

import { COLORS } from '../../../../constants';
import IAppointmentAdvancedView from './IAppointmentAdvancedView';
import { useVippsBooking } from '../../../../domains/Booking/hooks';
import { useWidget } from '../../../../contexts/Widget';

const AppointmentAdvancedView: React.FC<IAppointmentAdvancedView> = ({
  day,
  date,
  start, end,
  address,
  clinicianAvatar,
  clinicianName,
  setVippsLoading,
  setVippsBookingFailure,
  monthName,
}) => {
  const { currentTreatment, currentTimeslot, setCurrentScreen } = useWidget();
  const handleBookingWithVipps = useVippsBooking({ setVippsLoading, setVippsBookingFailure });
  const priceIstZero = useMemo(
    () => currentTreatment?.price && !!+currentTreatment.price,
    [currentTreatment],
  );
  const isVippsBookingAvailable = useMemo(
    () => typeof currentTreatment?.price === 'number' && !!currentTimeslot?.startStringDate,
    [currentTreatment, currentTimeslot],
  );

  const goToBookingMethodSelection = () => {
    setCurrentScreen?.('BookingOtherMethods');
  };

  return (
    <div
      className="card card-popover br-default over-y-scroll gap-huge"
    >
      <div className="flex row space-between mt-md gap-default word-br-normal">
        <div className="flex column gap-default">
          <div className="flex row space-between">
            <Title size="h6">{currentTreatment?.name}</Title>
            {!!priceIstZero && (
            <Title size="h6">
              <>
                {currentTreatment?.price}
                ,-
              </>
            </Title>
            )}
          </div>
          <Text size="body1" color="tertiary">
            {currentTreatment?.description}
          </Text>
          {currentTreatment?.selectedAddons?.map((addon:any) => (
            <div key={addon._id} className="flex">
              <Text size="body2" className="px-xs">
                ○
              </Text>
              <Text size="body2">
                {addon.title}
              </Text>
            </div>
          ))}
        </div>

      </div>
      <div className="flex column gap-huge">
        {/* <!-- Date and tome section  --> */}
        <div className="flex column gap-default">
          <Text size="body2" className="fw-title ff-title">Dato & klinikk</Text>
          <div className="flex gap-large">
            <CalendarItem cursor="default" showedDay bgc={COLORS[0]} name={day} size="lg" selected number={date} monthName={monthName} tabIndex={0} />

            {/* <!-- list for date 1 --> */}
            <div className="flex column justify-center">
              {/* <!-- Doctor available time  --> */}

              <Title size="h6">
                <>
                  {start}
                  -
                  {end}
                </>
              </Title>
              <Text size="body2">{address}</Text>
            </div>
          </div>
        </div>

        {/* <!-- Doctor section  -->   */}
        <div className="flex column gap-default">
          <Text size="body2" className="fw-title ff-title">Tannlege</Text>
          <div className="flex align-center gap-large">
            <Avatar
              size="md"
              src={clinicianAvatar}
              alt={clinicianName}
            />
            <Text size="body1">{clinicianName}</Text>
          </div>
        </div>

        <div className="flex align-center column mb-lg gap-default">
          <Button size="md" block variant="vipps" disabled={!isVippsBookingAvailable} onClick={handleBookingWithVipps}>
            Fortsett med VIPPS
          </Button>
          <Divider dividerWord="Eller" />
          <Button size="md" variant="secondary" block onClick={goToBookingMethodSelection}>
            Andre muligheter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentAdvancedView;
