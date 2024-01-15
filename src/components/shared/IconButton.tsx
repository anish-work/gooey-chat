const IconButton = (props: any) => {
  const btnClasses =
    "b-none br-small button-hover cr-pointer icon-btn p-12 font_16_500 bg-grey " +
    props.className;
  return (
    <button {...props} className={btnClasses}>
      {props.children}
    </button>
  );
};

export default IconButton;
