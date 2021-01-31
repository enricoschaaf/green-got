// @ts-check
// Not sure what is meant by "fully capitalize" so I decided to follow the Elixir/Lodash implementation of the capitalize function. https://hexdocs.pm/elixir/String.html#capitalize/2 https://lodash.com/docs/4.17.15#capitalize
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
