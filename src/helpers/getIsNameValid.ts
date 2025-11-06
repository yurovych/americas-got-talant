import {
  CONTAINS_NUMBER_REGEXP,
  MIN_MESSAGE_LENGTH,
  validationStatusObj,
} from '@/constants';

export const checkValidity = (
  name: string,
  setValidationStatus: (status: string) => void
) => {
  if (!name) {
    setValidationStatus(validationStatusObj.notProvided);
    return false;
  }

  if (CONTAINS_NUMBER_REGEXP.test(name)) {
    setValidationStatus(validationStatusObj.includesNumbers);
    return false;
  }

  if (name.length < MIN_MESSAGE_LENGTH) {
    setValidationStatus(validationStatusObj.tooShort);
    return false;
  } else {
    setValidationStatus(validationStatusObj.valid);
    return true;
  }
};
