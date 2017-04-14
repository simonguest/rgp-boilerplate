import fetch from 'isomorphic-fetch';

export default function gql(query, result, err) {
  return fetch('/graphql', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/graphql'},
    body: query
  })
    .then(response => {
      if (!response.ok) {
        return err("The API returned a non-HTTP 200 error code");
      } else {
        return response;
      }
    })
    .then(response => response.json())
    .then((json) => {
      if (json.errors) {
        return err(json.errors[0].message ? json.errors[0].message : 'An unknown API error has occurred');
      } else {
        return result(json.data);
      }
    })
}