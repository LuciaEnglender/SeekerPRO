export default function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (parseInt(input.name)) {
    errors.name = "Name is invalid, write a text";
  }
  if (!input.phone) {
    errors.phone = "Phone is required";
  }
  if (!input.location) {
    errors.location = "Location is required";
  }
  if(input.location.length > 1){
    errors.location = "Only One Location";
  }
  if (!input.linkedin) {
    errors.linkedin = "Linkedin is required";
  }
  if (!input.photo) {
    errors.photo = "Photo is required";
  }
  return errors;
}
