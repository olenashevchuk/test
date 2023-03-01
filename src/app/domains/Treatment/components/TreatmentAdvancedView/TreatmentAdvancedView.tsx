import {
  Accordion,
  Button,
  Card,
  Icon,
  Switch,
  Text,
} from '../../../../components';
import React, { useEffect, useState } from 'react';

import ITreatmentAdvancedView from './ITreatmentAdvancedView';
import { useWidget } from '../../../../../app/contexts/Widget';

const TreatmentAdvancedView: React.FC<ITreatmentAdvancedView> = ({
  name, description, price, id, selectedItem, setSelectedItem, addons,
}) => {
  const initialSelectedAddons = addons.length ? addons
    .filter(({ selectedByDefault }) => !!selectedByDefault) : [];

  const [selectedAddons, setSelectedAddons] = useState<any[]>(initialSelectedAddons);

  // calculate initialPrice price of treatment and all selected by default addons
  const [computedPrice, setComputedPrice] = useState<any>();
  const { setCurrentScreen, setCurrentTreatment } = useWidget();

  const handleAccordionClick = (accordionId:any) => {
    if (accordionId === selectedItem) {
      setSelectedItem('');
    } else setSelectedItem(accordionId);
    setComputedPrice(+price);
    setSelectedAddons(initialSelectedAddons);
  };

  const next = () => {
    setCurrentScreen?.('TimeslotsAll');
    const currentTreatment = {
      price: computedPrice, name, _id: id, description, selectedAddons,
    };
    setCurrentTreatment?.(currentTreatment);
  };
  // catch changes in addons and update computedPrice
  useEffect(() => {
    setComputedPrice(selectedAddons.length
      ? selectedAddons.reduce((acc, curr) => acc + Number(curr?.price), price) : price);
  }, [selectedAddons]);

  const onSwitcherClick = ({ addonPrice, label, _id }:any) => {
    const existedAddon = selectedAddons.find(({ _id: addonId }) => addonId === _id);
    setSelectedAddons((existedAddon
      ? selectedAddons.filter(({ _id: addonId }) => addonId !== _id)
      : [...selectedAddons, { price: addonPrice, title: label, _id }]));
  };

  return (
    <Card shape="roundedmd" paddingless variant={selectedItem === id ? 'selected' : 'secondary'}>
      <Accordion
        isCollapsed={selectedItem !== id}
        id={id}
        title={name}
        subtitle={description}
        extraInfo={computedPrice}
        tabIndex={0}
        onClick={handleAccordionClick}
      >
        <div className={addons.length ? 'mb-lg' : ''}>
          {!!addons.length && addons.map((addon) => (
            <div key={addon._id} className="flex space-between word-br-normal mb-sm align-center">
              <Switch
                _id={addon._id}
                label={addon.title}
                addonPrice={addon.price}
                addonName={addon.name}
                checked={addon.selectedByDefault}
                onClick={onSwitcherClick}
              />
              <Text size="body2" className="fw-title">
                {addon.price}
                ,-
              </Text>
            </div>
          ))}
        </div>
        <Button id={id} size="md" block variant="primary" onClick={next}>
          <Text>Velg</Text>
          <Icon icon="fas fa-caret-right" />
        </Button>
      </Accordion>
    </Card>
  );
};

export default TreatmentAdvancedView;
