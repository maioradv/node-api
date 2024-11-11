export function replace(text:string, replace:Record<string,any>) {
  const reg = new RegExp(Object.keys(replace).map(key => `\\[${key}\\]`).join("|"), "g");
  return text.replace(reg, (matched) => {
    const cleanKey = matched.replace(/[\[\]]/g, '') as keyof typeof replace
    return replace[cleanKey] || matched;
  });
}
