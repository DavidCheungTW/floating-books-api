const getBooks = async () => {
  const response = await fetch(`http://${window.location.host}/books`);
  const data = await response.json();
  return data;
};
