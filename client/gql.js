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
        return err("There was an error calling the API");
      } else {
        return response;
      }
    })
    .then(response => response.json())
    .then(json => result(json.data))
}