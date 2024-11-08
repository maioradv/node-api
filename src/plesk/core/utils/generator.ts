
export function ftpCredentialsGenerator(domain:string) {
  const ftpLogin = domain.replace(/\./g,'')
  const ftpPassword = randomPassword()
  return {
    ftpLogin,
    ftpPassword
  }
}

function randomPassword(length: number = 15): string {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@$%&?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}