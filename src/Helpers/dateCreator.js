export default function dateCreator() {
  let date = new Date();
  let dateCreated = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ).toLocaleString();

  return dateCreated;
}
