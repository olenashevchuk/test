import IAccordion from './IAccordion';
import React from 'react';
import Text from '../Text';
import Title from '../Title';

/**
 * It's a React component that renders a title, an optional extraInfo, and an optional children. It
 * also has a state that determines whether the children are visible or not
 * @param  - `collapsed` - a boolean that determines whether the accordion is collapsed or not.
 * @returns A React component that renders an accordion.
 */
const Accordion: React.FC<IAccordion> = ({
  title,
  subtitle,
  extraInfo,
  tabIndex,
  children,
  isCollapsed,
  onClick,
  id,
}) => {
  // Methods
  const handleAccordionClick = (): void => {
    onClick(id);
  };
  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleAccordionClick();
    }
  };
  const priceIstZero = extraInfo?.toString() === '0';
  return (
    <div
      onClick={handleAccordionClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={tabIndex}
      className="accordion p-md"
    >
      <div className="flex row space-between align-center">
        <div className="flex column mr-xs w100">
          <div className={`flex row  space-between align-center ${isCollapsed ? '' : 'mb-sm'}`}>
            <Title size="h6">{title}</Title>
            {priceIstZero || isCollapsed ? null : (
              <div className="word-br-normal">
                <Title size="h6">
                  <>
                    {extraInfo}
                    ,-
                  </>
                </Title>
              </div>
            )}
          </div>
          {isCollapsed ? null : (
            <Text className="word-br-normal" size="body1">
              {subtitle}
            </Text>
          )}
        </div>

      </div>

      {isCollapsed ? null : (
        <div className="accordion-panel mt-md">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
