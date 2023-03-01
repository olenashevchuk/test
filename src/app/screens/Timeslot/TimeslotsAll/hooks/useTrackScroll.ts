import { useEffect } from 'react';

const SPINNER_HEIGHT = 52;
interface scrollTrackerParams {
  getTimeslotsNextBatch: () => void;
}

const useTrackScroll = (props: scrollTrackerParams) => {
  const { getTimeslotsNextBatch } = props;

  // Used to prevent multiple calling of fetching next batch of timeslots
  let scrollHeightValue = 0;

  useEffect(() => {
    const tree: ShadowRoot = document.querySelector('dent-in-widget')?.shadowRoot as ShadowRoot;
    const scrolled = tree?.querySelector('#scrolled') as Element;

    const scrollTrackingCallback = () => {
      const header:Element = tree?.querySelector('#top-layer-wrapper') as Element;
      const clinicList:Element = tree?.querySelector('#clinic-list-wrapper') as Element;
      const clinicListName:Element = tree?.querySelector('#clinic-list-name') as Element;
      const timeslotsBatchSpinner:Element = tree?.querySelector('#timeslots-batch-spin') as Element;

      if (scrolled.scrollTop > 80) {
        header.classList.remove('mt-lg', 'mb-lg');
        header.classList.add('transition-speed-default', 'h6', 'mt-sm');
      } else {
        header.classList.add('transition-speed-default', 'mt-lg', 'mb-sm');
        header.classList.remove('h6', 'mt-sm');
      }
      if (scrolled.scrollTop > 240) {
        header.classList.add('transition-speed-default', 'hidden');
        header.classList.remove('visible');
        clinicList.classList.remove('mt-lg', 'mb-lg');
        clinicList.classList.add('transition-speed-default', 'mt-md', 'mb-md');
        clinicListName.classList.add('transition-speed-default', 'pl-xl');
      } else {
        header.classList.remove('hidden');
        header.classList.add('transition-speed-default', 'visible');
        clinicList.classList.add('transition-speed-default', 'mt-lg', 'mb-lg');
        clinicList.classList.remove('mt-md', 'mb-md');
        clinicListName.classList.remove('pl-xl');
      }

      // When fetch timeslots batch spinner visible and user scroll from bottom to top hide spinner
      // and show when user scroll scrolled to bottom
      if (
        scrolled.scrollTop > scrolled.scrollHeight - scrolled.clientHeight - SPINNER_HEIGHT
      ) {
        timeslotsBatchSpinner?.classList?.remove('hidden');
        timeslotsBatchSpinner?.classList?.add('transition-speed-default', 'visible');
      } else {
        timeslotsBatchSpinner?.classList?.add('transition-speed-default', 'hidden');
        timeslotsBatchSpinner?.classList?.remove('visible');
      }

      // When user scrolled to bottom fetch next batch of timeslots
      if (
        scrolled.scrollTop > scrolled.scrollHeight - scrolled.clientHeight - 100
        && scrolled.scrollHeight > scrollHeightValue
      ) {
        scrollHeightValue = scrolled.scrollHeight;
        getTimeslotsNextBatch();
      }
    };

    scrolled?.addEventListener('scroll', scrollTrackingCallback);

    return () => {
      scrolled?.removeEventListener('scroll', scrollTrackingCallback);
    };
  }, [getTimeslotsNextBatch]);
};

export default useTrackScroll;
