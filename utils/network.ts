import { client } from "../client";
import { gql } from '@apollo/client';

export const getCitiesByCountry = (variables: any)=>client.query({
  query: gql`
    query getCitiesByCountry($countryId: Int, $limit: Int){
      countries(id: $countryId){
        id
        name
        cities(limit: $limit){
          id
          name
          native
        }
      }
    }
  `,
  variables
})
export const countries = ()=>client.query({
  query: gql`
    query countries{
      countries{
        id
        name
      }
    }
  `
})
export const currencies = ()=> client.query({
  query: gql`
    query {
      currencies{
        id
        abbr
      }
    }
  `
})
export const languages = ()=> client.query({
  query: gql`
    query languages{
      languages{
        id
        name
      }
    }
  `
})