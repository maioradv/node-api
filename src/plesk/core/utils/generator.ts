
export function ftpCredentialsGenerator(domain:string) {
  const ftpLogin = domain.replace(/\./g,'')
  const ftpPassword = randomPassword()
  return {
    ftpLogin,
    ftpPassword
  }
}

export function dbCredentialsGenerator(domain:string) {
  const name = domain.replace(/\./g,'')
  const login = `${name}_u`
  const password = randomPassword()
  return {
    name,
    login,
    password
  }
}

export function randomPassword(length: number = 15): string {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export function randomString(length: number = 50): string {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$#@%.,?'£&/()=^[]°-_:;ç§<>+*|";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}