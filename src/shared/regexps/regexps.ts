export const userNameRegExp = RegExp(/^[0-9A-Za-z_-]+$/)
export const firstAndLastNameRegExp = RegExp(/^[A-Za-zА-Яа-я]*$/)
export const AboutMeRegExp = RegExp(/^[0-9A-Za-zА-Яа-я\W\s]*$/)
export const passwordRegExp = RegExp(
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/
)
