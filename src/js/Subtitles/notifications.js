// Notify Wrong Sub
export function notifyWrongSub() {
  const message = 'Ooops... Seems to wrong SUB!';
  const options = { position: 'center-center', timeout: 3000 };
  return Notify.failure(message, options);
}
