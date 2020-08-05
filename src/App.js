import React from "react";
import "./App.css";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import axios, { CancelToken } from "axios";

// function App() {
//   const [pokemon, setPokemon] = React.useState("");

//   return (
//     <div>
//       <input
//         value={pokemon}
//         onChange={(e) => {
//           setPokemon(e.target.value);
//         }}
//       />
//       <PokemonSearch pokemon={pokemon} />
//       <Count />
//       <Pokemon />
//       <Berry />
//       <ReactQueryDevtools />
//     </div>
//   );
// }

// function usePokemon() {
//   const queryInfo = useQuery("pokemons", async () => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     // if (true) {
//     //   throw new Error("test error");
//     // }
//     return axios
//       .get("https://pokeapi.co/api/v2/pokemon")
//       .then((res) => res.data.results);
//   });
//   return queryInfo;
// }

// function PokemonSearch({ pokemon }) {
//   const queryInfo = useQuery(
//     ["pokemon", pokemon],
//     () => {
//       const source = CancelToken.source();
//       const promise = new Promise((resolve) => setTimeout(resolve, 2000))
//         .then(() => {
//           return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
//             cancelToken: source.token,
//           });
//         })
//         .then((res) => res.data);
//       promise.cancel = () => {
//         source.cancel("Query was cancelled by React Query");
//       };
//       return promise;
//     },
//     { enabled: pokemon, retry: false }
//   );
//   return queryInfo.isLoading ? (
//     "Loading..."
//   ) : queryInfo.isError ? (
//     queryInfo.error.message
//   ) : (
//     <div>
//       {queryInfo.data?.sprites?.front_default ? (
//         <>
//           <img src={queryInfo.data.sprites.front_default} alt="pokemon" />
//           <br />
//         </>
//       ) : (
//         "pokemon not found"
//       )}

//       <br />
//       {queryInfo.isFetching ? "updating" : null}
//     </div>
//   );
// }

// function useBerries() {
//   const queryInfo = useQuery("berries", async () => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     // if (true) {
//     //   throw new Error("test error");
//     // }
//     return axios
//       .get("https://pokeapi.co/api/v2/berry")
//       .then((res) => res.data.results);
//   });
//   return queryInfo;
// }

// function Count() {
//   const queryInfo = usePokemon();
//   return <h3>You are looking at {queryInfo.data?.length} pokemon.</h3>;
// }
// //https://pokeapi.co/api/v2/pokemon
// function Pokemon() {
//   const queryInfo = usePokemon();
//   return queryInfo.isLoading ? (
//     "Loading..."
//   ) : queryInfo.isError ? (
//     queryInfo.error.message
//   ) : (
//     <div>
//       {queryInfo.data.map((result) => {
//         return <div key={result.name}>{result.name}</div>;
//       })}
//       <br />
//       {queryInfo.isFetching ? "updating" : null}
//     </div>
//   );
// }

// function Berry() {
//   const queryInfo = useBerries();
//   return queryInfo.isLoading ? (
//     "Loading..."
//   ) : queryInfo.isError ? (
//     queryInfo.error.message
//   ) : (
//     <div>
//       {queryInfo.data.map((result) => {
//         return <div key={result.name}>{result.name}</div>;
//       })}
//       <br />
//       {queryInfo.isFetching ? "updating" : null}
//     </div>
//   );
// }

const email = "Sincere@april.biz";
function MyPost() {
  const userQuery = useQuery("user", () =>
    axios
      .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
      .then((res) => res.data[0])
  );
  const postsQuery = useQuery(
    "posts",
    () =>
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userQuery.data.id}`
        )
        .then((res) => res.data),
    { enabled: userQuery.data?.id }
  );
  return userQuery.isLoading ? (
    "...Loading user..."
  ) : (
    <div>
      User Id: {userQuery.data.id}
      <br />
      <br />
      {postsQuery.isIdle ? null : postsQuery.isLoading ? (
        "loading post...."
      ) : (
        <div>Post Count: {postsQuery.data.length}</div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <MyPost />
      <ReactQueryDevtools />
    </div>
  );
}
