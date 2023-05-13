async function postBook(event) {
  event.preventDefault();

  const title = document.getElementById('bookTitleField').value;
  const ISBN = document.getElementById('bookISBNField').value;
  const author = document.getElementById('bookAuthorField').value;
  const releaseDate = document.getElementById('bookReleaseDateField').value;
  const image = document.getElementById('bookImageField').files[0];
  const comment = document.getElementById('bookCommentField').value;
  const donateDate = document.getElementById('bookDonateDateField').value;
  const genreId = document.getElementById('bookGenreIdField').value;
  const donatorId = document.getElementById('bookDonatorIdField').value;
  const ownerId = document.getElementById('bookOwnerIdField').value;

  const formData = new FormData();

  formData.append('title', title);
  formData.append('ISBN', ISBN);
  formData.append('author', author);
  formData.append('releaseDate', releaseDate);
  formData.append('donatorComment', comment);
  formData.append('donateDate', donateDate);
  formData.append('genreId', genreId);
  formData.append('donatorId', donatorId);
  formData.append('ownerId', ownerId);
  if (image) {
    formData.append('image', image);
  } else {
    formData.append('image', '');
  }

  const response = await fetch(`http://${window.location.host}/books`, {
    method: 'POST',
    body: formData,
  });

  const responseBody = await response.json();

  if (!response.ok) {
    window.alert('Oops: Something went wrong :(');
  } else {
    window.location.replace(`http://${window.location.host}`);
  }
}
