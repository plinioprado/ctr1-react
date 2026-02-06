function FieldBlank({ format_field }) {
  return (
    !(format_field.display && format_field.display === false) && (
      <div className={`col-md-${format_field.md}`} key={format_field.name}>
        &nbsp;
      </div>
    )
  );
}

export default FieldBlank;
