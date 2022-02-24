export default function validate(input) {
  let errors = {};
  let validateName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  if (!input.name || !validateName.test(input.name)) {
    errors.name = "Name is required";
  } else if (parseInt(input.name)) {
    errors.name = "Name is invalid, write a text";
  }
  if (input.phone[0] === "-") errors.phone = " Only positive numbers";
  return errors;
}

//^ \ d + $ o ^ [1-9] \ d * | 0 $
//^[a-z]+$/i;
// Expresiones Regulares:
// - regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
// - regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
// - regexComments = /^.{1,255}$/;
