function slugGenerator(str) {
  return str
    .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
    .toLowerCase()
    .split(' ')
    .join('-')
    .replace(/^-+|-+(?=-|$)/g, '');
}

export default slugGenerator;
