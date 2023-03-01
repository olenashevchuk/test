const useCloseWidget = () => {
  const tree = document.querySelector('dent-in-widget')?.shadowRoot;
  tree?.getElementById('dent-in-widget__container')?.remove();
};
export default useCloseWidget;
