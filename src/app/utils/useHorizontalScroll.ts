import { useEffect } from 'react';

const useHorizontalScroll = (scrolledField:any) => {
  useEffect(() => {
    const tree = document.querySelector('dent-in-widget')?.shadowRoot;
    const scrolled:any = tree?.querySelector(scrolledField);
    if (scrolledField) {
      scrolled.addEventListener('wheel', (evt:any) => {
        evt.preventDefault();
        scrolled.scrollLeft += evt.deltaY;
      });
    }
  }, [scrolledField]);
};
export default useHorizontalScroll;
