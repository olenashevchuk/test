import WidgetContext from './WidgetContext';
import { useContext } from 'react';

const useWidget = () => useContext(WidgetContext);

export default useWidget;
